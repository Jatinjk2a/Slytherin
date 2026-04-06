const GenerationLog = require('../models/GenerationLog');
const User = require('../models/User');
const { pushFileToRepo, parseGithubUrl } = require('../services/githubService');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

// POST /api/github/push-readme
async function pushReadme(req, res) {
  const { log_id, commit_message, branch } = req.body;
  const userId = req.user._id;

  // Retrieve the completed generation log
  const log = await GenerationLog.findOne({ _id: log_id, user_id: userId, status: 'completed' })
    .select('repo_url final_markdown repo_name')
    .lean();

  if (!log) {
    return errorResponse(res, 'Completed generation not found for this ID', 404);
  }

  // Retrieve the user's GitHub OAuth token
  const user = await User.findById(userId).select('+github_token');
  if (!user?.github_token) {
    return errorResponse(
      res,
      'GitHub OAuth token required. Please connect your GitHub account.',
      401
    );
  }

  const { owner, repo } = parseGithubUrl(log.repo_url);

  logger.info(`Pushing README to ${owner}/${repo} on branch ${branch}`);

  const result = await pushFileToRepo({
    owner,
    repo,
    path: 'README.md',
    content: log.final_markdown,
    message: commit_message || 'docs: update README via README AI',
    branch: branch || 'main',
    userToken: user.github_token,
  });

  logger.info(`README pushed — commit: ${result.commit_sha}`);

  return successResponse(res, {
    message: 'README.md successfully pushed to repository',
    repo: `${owner}/${repo}`,
    branch,
    commit_sha: result.commit_sha,
    url: result.html_url,
  });
}

// GET /api/github/repos  — list user's GitHub repos (requires OAuth)
async function listRepos(req, res) {
  const { Octokit } = require('@octokit/rest');
  const user = await User.findById(req.user._id).select('+github_token');

  if (!user?.github_token) {
    return errorResponse(res, 'GitHub account not connected', 401);
  }

  const octokit = new Octokit({ auth: user.github_token });
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: 'updated',
    per_page: 50,
  });

  const repos = data.map((r) => ({
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    private: r.private,
    updated_at: r.updated_at,
  }));

  return successResponse(res, repos);
}

module.exports = { pushReadme, listRepos };
