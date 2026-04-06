const { Octokit } = require('@octokit/rest');
const logger = require('../utils/logger');

/**
 * Parse a GitHub URL into { owner, repo }
 */
function parseGithubUrl(url) {
  const match = url.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?(?:\/.*)?$/);
  if (!match) throw new Error(`Invalid GitHub URL: ${url}`);
  return { owner: match[1], repo: match[2] };
}

/**
 * Build an Octokit instance — uses the user's token if provided.
 */
function buildOctokit(token) {
  return new Octokit({
    auth: token || process.env.GITHUB_TOKEN,
    userAgent: 'readme-ai/1.0.0',
  });
}

/**
 * Fetch full repository metadata from GitHub API.
 * Returns structured object used by scoring + LLM prompts.
 */
async function fetchRepoMetadata(repoUrl, userToken) {
  const { owner, repo } = parseGithubUrl(repoUrl);
  const octokit = buildOctokit(userToken);

  const [repoData, contentsData, languagesData, readmeData] = await Promise.allSettled([
    octokit.repos.get({ owner, repo }),
    octokit.repos.getContent({ owner, repo, path: '' }),
    octokit.repos.listLanguages({ owner, repo }),
    octokit.repos.getReadme({ owner, repo }).catch(() => null),
  ]);

  if (repoData.status === 'rejected') {
    const err = repoData.reason;
    if (err.status === 404) throw new Error(`Repository not found: ${repoUrl}`);
    if (err.status === 403) throw new Error('GitHub API rate limit exceeded');
    throw new Error(`GitHub API error: ${err.message}`);
  }

  const r = repoData.value.data;
  const files = contentsData.status === 'fulfilled'
    ? contentsData.value.data.map((f) => f.name)
    : [];
  const languages = languagesData.status === 'fulfilled'
    ? Object.keys(languagesData.value.data)
    : [];

  // Decode README if available
  let readmeContent = '';
  if (readmeData.status === 'fulfilled' && readmeData.value?.data) {
    readmeContent = Buffer.from(readmeData.value.data.content, 'base64').toString('utf8');
  }

  // Detect test, CI, license presence
  const hasTests = files.some((f) =>
    ['test', 'tests', 'spec', '__tests__', 'jest.config.js', 'pytest.ini'].includes(f.toLowerCase())
  );
  const hasCI = files.some((f) =>
    ['.github', '.circleci', '.travis.yml', 'Jenkinsfile', '.gitlab-ci.yml'].includes(f)
  );

  return {
    owner,
    repo,
    full_name: r.full_name,
    description: r.description || '',
    stars: r.stargazers_count,
    forks: r.forks_count,
    open_issues: r.open_issues_count,
    language: r.language,
    languages,
    topics: r.topics || [],
    license: r.license?.spdx_id || null,
    default_branch: r.default_branch,
    created_at: r.created_at,
    updated_at: r.updated_at,
    homepage: r.homepage,
    is_fork: r.fork,
    file_tree: files,
    has_tests: hasTests,
    has_ci: hasCI,
    readme_content: readmeContent,
  };
}

/**
 * Push a file to a GitHub repository via the Contents API.
 */
async function pushFileToRepo({ owner, repo, path, content, message, branch, userToken }) {
  const octokit = buildOctokit(userToken);

  // Check if file already exists (needed for SHA to update)
  let sha;
  try {
    const existing = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    sha = existing.data.sha;
  } catch {
    // File doesn't exist — it will be created
  }

  const response = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  });

  return {
    commit_sha: response.data.commit.sha,
    html_url: response.data.content?.html_url,
  };
}

module.exports = { parseGithubUrl, fetchRepoMetadata, pushFileToRepo };
