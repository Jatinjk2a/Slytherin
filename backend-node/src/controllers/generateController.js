const GenerationLog = require('../models/GenerationLog');
const UserPreferences = require('../models/UserPreferences');
const User = require('../models/User');
const { enqueueGeneration } = require('../queues/generationQueue');
const { isRedisAvailable } = require('../config/redis');
const { fetchRepoMetadata } = require('../services/githubService');
const { scoreRepository } = require('../services/scoringService');
const { generateReadme } = require('../services/llmService');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Synchronous fallback pipeline — runs when Redis/BullMQ is unavailable.
 * Processes the entire generation in-request (blocking but functional for dev).
 */
async function processSynchronously(log, repoUrl, options, prefs, userToken) {
  try {
    await GenerationLog.findByIdAndUpdate(log._id, { status: 'processing', progress: 20 });

    const metadata = await fetchRepoMetadata(repoUrl, userToken);
    await GenerationLog.findByIdAndUpdate(log._id, { repo_name: metadata.full_name, progress: 45 });

    const scoreData = scoreRepository(metadata);
    await GenerationLog.findByIdAndUpdate(log._id, { progress: 60 });

    const generationOptions = {
      style: options.style || prefs?.readme_style || 'standard',
      include_badges: options.include_badges ?? prefs?.include_badges ?? true,
      include_toc: options.include_toc ?? prefs?.include_toc ?? true,
      custom_sections: options.custom_sections || [],
      doc_tone: prefs?.doc_tone || 'professional',
    };

    const { markdown } = await generateReadme(metadata, generationOptions);

    await GenerationLog.findByIdAndUpdate(log._id, {
      status: 'completed',
      progress: 100,
      final_markdown: markdown,
      score: scoreData,
      generation_options: generationOptions,
    });

    logger.info(`Sync generation completed for ${repoUrl}`);
  } catch (err) {
    logger.error(`Sync generation failed for ${repoUrl}: ${err.message}`);
    await GenerationLog.findByIdAndUpdate(log._id, {
      status: 'failed',
      error_message: err.message,
    });
  }
}

// POST /api/generate
async function startGeneration(req, res) {
  const { repo_url, style, include_badges, include_toc, custom_sections } = req.body;
  const userId = req.user._id;

  const [prefs, userDoc] = await Promise.all([
    UserPreferences.findOne({ user_id: userId }).lean(),
    User.findById(userId).select('+github_token'),
  ]);

  const log = await GenerationLog.create({
    user_id: userId,
    repo_url,
    status: 'queued',
    progress: 0,
    generation_options: { style, include_badges, include_toc, custom_sections },
  });

  const userToken = userDoc?.github_token;
  const options = { style, include_badges, include_toc, custom_sections };

  if (isRedisAvailable()) {
    // ── Async path (BullMQ) ────────────────────────────────────────────────
    await enqueueGeneration({
      logId: log._id.toString(),
      userId: userId.toString(),
      repoUrl: repo_url,
      options,
      userToken,
      preferences: prefs || {},
    });

    return successResponse(res, {
      job_id: log._id.toString(),
      status: 'queued',
      mode: 'async',
      message: 'Generation queued. Poll /api/generate/:job_id/status for updates.',
    }, 202);
  }

  // ── Sync path (no Redis) — fire and forget, return immediately ─────────────
  logger.warn('Redis unavailable — processing generation synchronously (background)');
  setImmediate(() => processSynchronously(log, repo_url, options, prefs, userToken));

  return successResponse(res, {
    job_id: log._id.toString(),
    status: 'queued',
    mode: 'sync',
    message: 'Generation started (sync mode). Poll /api/generate/:job_id/status for updates.',
  }, 202);
}

// GET /api/generate/:job_id/status
async function getStatus(req, res) {
  const { job_id } = req.params;
  const userId = req.user._id;

  const log = await GenerationLog.findOne({ _id: job_id, user_id: userId })
    .select('status progress error_message created_at updated_at repo_url repo_name')
    .lean();

  if (!log) return errorResponse(res, 'Job not found', 404);

  return successResponse(res, {
    job_id,
    status: log.status,
    progress: log.progress,
    repo_url: log.repo_url,
    repo_name: log.repo_name,
    error: log.error_message || null,
    created_at: log.created_at,
    updated_at: log.updated_at,
  });
}

// GET /api/generate/:job_id/result
async function getResult(req, res) {
  const { job_id } = req.params;
  const userId = req.user._id;

  const log = await GenerationLog.findOne({ _id: job_id, user_id: userId }).lean();
  if (!log) return errorResponse(res, 'Job not found', 404);

  if (log.status !== 'completed') {
    return errorResponse(
      res,
      `Generation not complete. Current status: ${log.status}`,
      log.status === 'failed' ? 422 : 202
    );
  }

  return successResponse(res, {
    job_id,
    repo_url: log.repo_url,
    repo_name: log.repo_name,
    markdown: log.final_markdown,
    score: log.score,
    generation_options: log.generation_options,
    created_at: log.created_at,
  });
}

// GET /api/generate/:job_id/download
async function downloadReadme(req, res) {
  const { job_id } = req.params;
  const { format = 'md' } = req.query;
  const userId = req.user._id;

  const log = await GenerationLog.findOne({ _id: job_id, user_id: userId })
    .select('status final_markdown repo_name')
    .lean();

  if (!log) return errorResponse(res, 'Job not found', 404);
  if (log.status !== 'completed') return errorResponse(res, 'README not ready yet', 400);

  const safeRepoName = (log.repo_name || 'README').replace(/[^a-zA-Z0-9_-]/g, '_');

  if (format === 'md') {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeRepoName}_README.md"`);
    return res.send(log.final_markdown);
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${safeRepoName}_README.txt"`);
  return res.send(log.final_markdown);
}

module.exports = { startGeneration, getStatus, getResult, downloadReadme };
