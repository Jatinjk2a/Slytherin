const GenerationLog = require('../models/GenerationLog');
const { fetchRepoMetadata } = require('../services/githubService');
const { scoreRepository } = require('../services/scoringService');
const { getRedisClient, isRedisAvailable } = require('../config/redis');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

const SCORE_CACHE_TTL = 60 * 60; // 1 hour

// GET /api/repo/:id/score  (id = GenerationLog _id)
async function getScoreByLogId(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  const log = await GenerationLog.findOne({ _id: id, user_id: userId })
    .select('score repo_url repo_name status')
    .lean();

  if (!log) return errorResponse(res, 'Generation record not found', 404);
  if (!log.score) return errorResponse(res, 'Score not yet computed', 400);

  return successResponse(res, {
    repo_url: log.repo_url,
    repo_name: log.repo_name,
    total_score: log.score.total_score,
    readability: log.score.readability,
    coverage: log.score.coverage_summary,
    vulnerabilities: log.score.vulnerabilities,
    breakdown: {
      readme_quality: log.score.readme_quality,
      code_structure: log.score.code_structure,
      activity: log.score.activity,
      documentation: log.score.documentation,
      test_coverage: log.score.test_coverage,
      security: log.score.security,
    },
  });
}

// GET /api/repo/score?url=https://github.com/owner/repo
// On-demand scoring without a generation job
async function scoreByUrl(req, res) {
  const { url } = req.query;
  if (!url) return errorResponse(res, 'url query parameter required', 400);
  if (!url.includes('github.com')) return errorResponse(res, 'Must be a GitHub URL', 400);

  // Cache check (skip if Redis unavailable)
  const cacheKey = `score:${url}`;
  if (isRedisAvailable()) {
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.info(`Score cache HIT for ${url}`);
        return successResponse(res, { ...JSON.parse(cached), cached: true });
      }
    } catch {
      // Redis error — continue without cache
    }
  }

  const userDoc = await require('../models/User').findById(req.user._id).select('+github_token');
  const metadata = await fetchRepoMetadata(url, userDoc?.github_token);
  const score = scoreRepository(metadata);

  // Cache result (skip if Redis unavailable)
  if (isRedisAvailable()) {
    try {
      const redis = getRedisClient();
      await redis.setex(cacheKey, SCORE_CACHE_TTL, JSON.stringify(score));
    } catch {}
  }

  return successResponse(res, { ...score, cached: false });
}

// GET /api/repo/leaderboard
async function getLeaderboard(req, res) {
  const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);

  const top = await GenerationLog.find({ status: 'completed', 'score.total_score': { $gte: 0 } })
    .sort({ 'score.total_score': -1 })
    .limit(limit)
    .select('repo_url repo_name score.total_score score.readability created_at')
    .lean();

  return successResponse(res, top.map((l) => ({
    repo_url: l.repo_url,
    repo_name: l.repo_name,
    total_score: l.score?.total_score,
    readability: l.score?.readability,
    generated_at: l.created_at,
  })));
}

module.exports = { getScoreByLogId, scoreByUrl, getLeaderboard };
