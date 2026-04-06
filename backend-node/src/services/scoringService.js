/**
 * Repository Scoring System
 *
 * Total: 100 points
 *   readme_quality  → 25 pts
 *   code_structure  → 25 pts
 *   activity        → 20 pts
 *   documentation   → 15 pts
 *   test_coverage   → 10 pts
 *   security        →  5 pts
 */

const SECURITY_PATTERNS = [
  /password\s*=\s*['"][^'"]+['"]/i,
  /api[_-]?key\s*=\s*['"][^'"]+['"]/i,
  /secret\s*=\s*['"][^'"]+['"]/i,
  /token\s*=\s*['"][^'"]+['"]/i,
  /eval\s*\(/i,
  /exec\s*\(/i,
];

function detectReadability(readmeContent) {
  if (!readmeContent) return 'Low';
  const len = readmeContent.length;
  const hasHeaders = (readmeContent.match(/^#+\s/gm) || []).length;
  const hasCodeBlocks = (readmeContent.match(/```/g) || []).length / 2;

  if (len > 2000 && hasHeaders >= 3 && hasCodeBlocks >= 1) return 'High';
  if (len > 500 || hasHeaders >= 1) return 'Medium';
  return 'Low';
}

function scoreReadmeQuality(metadata) {
  // Max: 25
  if (!metadata.readme_content) return 0;

  const len = metadata.readme_content.length;
  let score = 0;

  if (len > 3000) score += 15;
  else if (len > 1500) score += 10;
  else if (len > 500) score += 6;
  else score += 2;

  const headers = (metadata.readme_content.match(/^#+\s/gm) || []).length;
  if (headers >= 5) score += 5;
  else if (headers >= 3) score += 3;
  else if (headers >= 1) score += 1;

  const hasCodeBlock = /```/.test(metadata.readme_content);
  if (hasCodeBlock) score += 3;

  const hasBadges = /!\[.+\]\(https?:\/\/.+badge.+\)/.test(metadata.readme_content);
  if (hasBadges) score += 2;

  return Math.min(score, 25);
}

function scoreCodeStructure(metadata) {
  // Max: 25
  let score = 0;
  const files = metadata.file_tree.map((f) => f.toLowerCase());

  // Standard architectural directories
  const srcDirs = ['src/', 'lib/', 'app/', 'packages/', 'modules/', 'core/'];
  if (srcDirs.some((d) => files.some((f) => f.startsWith(d)))) score += 8;

  // Configuration files
  const configs = [
    'package.json', 'requirements.txt', 'pyproject.toml', 'go.mod',
    'cargo.toml', 'pom.xml', 'build.gradle', 'gemfile',
  ];
  if (configs.some((c) => files.includes(c))) score += 5;

  // Docker / containerization
  if (files.some((f) => ['dockerfile', 'docker-compose.yml', 'docker-compose.yaml'].includes(f))) {
    score += 4;
  }

  // CI/CD
  if (metadata.has_ci) score += 5;

  // Contributing / community health
  const communityFiles = ['contributing.md', 'code_of_conduct.md', 'security.md'];
  if (files.some((f) => communityFiles.includes(f))) score += 3;

  return Math.min(score, 25);
}

function scoreActivity(metadata) {
  // Max: 20
  let score = 0;

  if (metadata.stars > 5000) score += 12;
  else if (metadata.stars > 1000) score += 10;
  else if (metadata.stars > 100) score += 7;
  else if (metadata.stars > 10) score += 4;
  else if (metadata.stars > 0) score += 1;

  if (metadata.forks > 500) score += 5;
  else if (metadata.forks > 100) score += 4;
  else if (metadata.forks > 10) score += 2;
  else if (metadata.forks > 0) score += 1;

  // Recency bonus — updated within last 6 months
  if (metadata.updated_at) {
    const monthsOld =
      (Date.now() - new Date(metadata.updated_at).getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsOld < 1) score += 3;
    else if (monthsOld < 6) score += 2;
    else if (monthsOld < 12) score += 1;
  }

  return Math.min(score, 20);
}

function scoreDocumentation(metadata) {
  // Max: 15
  let score = 0;
  const files = metadata.file_tree.map((f) => f.toLowerCase());

  if (metadata.license) score += 5;
  if (metadata.description) score += 3;
  if (metadata.homepage) score += 2;
  if (metadata.topics?.length > 0) score += 2;
  if (files.some((f) => f.startsWith('docs/') || f === 'wiki')) score += 3;

  return Math.min(score, 15);
}

function scoreTestCoverage(metadata) {
  // Max: 10
  let score = 0;
  const files = metadata.file_tree.map((f) => f.toLowerCase());

  if (metadata.has_tests) score += 6;

  const coverageFiles = ['codecov.yml', '.coveragerc', 'jest.config.js', 'jest.config.ts', 'vitest.config.ts'];
  if (files.some((f) => coverageFiles.includes(f))) score += 2;

  // Coverage badge in README
  if (/codecov|coveralls|coverage/.test(metadata.readme_content || '')) score += 2;

  return Math.min(score, 10);
}

function scoreSecurity(metadata) {
  // Max: 5 (starts at 5, deductions for vulnerabilities)
  let vulnerabilities = 0;
  const textToScan = metadata.readme_content || '';

  for (const pattern of SECURITY_PATTERNS) {
    if (pattern.test(textToScan)) vulnerabilities++;
  }

  // Check for .env files committed (bad practice)
  if (metadata.file_tree.some((f) => f === '.env')) vulnerabilities++;

  const score = Math.max(0, 5 - vulnerabilities);
  return { score, vulnerabilities };
}

/**
 * Main scoring function
 * @param {object} metadata - From githubService.fetchRepoMetadata()
 * @returns {object} Full score breakdown
 */
function scoreRepository(metadata) {
  const readme_quality = scoreReadmeQuality(metadata);
  const code_structure = scoreCodeStructure(metadata);
  const activity = scoreActivity(metadata);
  const documentation = scoreDocumentation(metadata);
  const test_coverage = scoreTestCoverage(metadata);
  const { score: security, vulnerabilities } = scoreSecurity(metadata);

  const total_score = readme_quality + code_structure + activity + documentation + test_coverage + security;
  const readability = detectReadability(metadata.readme_content);

  const coveragePct = metadata.has_tests ? '≥ 1 test suite detected' : 'No test suite found';

  return {
    total_score: Math.round(total_score),
    readme_quality,
    code_structure,
    activity,
    documentation,
    test_coverage,
    security,
    readability,
    vulnerabilities,
    coverage_summary: coveragePct,
  };
}

module.exports = { scoreRepository };
