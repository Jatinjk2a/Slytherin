/**
 * README Generation Worker
 *
 * Run independently: node src/workers/generationWorker.js
 *
 * Pipeline per job:
 *   1. Update DB status → 'processing'
 *   2. Fetch repo metadata from GitHub API
 *   3. Score the repository
 *   4. Build prompt and call LLM
 *   5. Store result in DB → status 'completed'
 *
 * On failure: mark DB record as 'failed' with error message
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
require('express-async-errors');

const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const { getRedisClient, connectRedis } = require('../config/redis');
const { connectDB } = require('../config/db');
const GenerationLog = require('../models/GenerationLog');
const { fetchRepoMetadata } = require('../services/githubService');
const { scoreRepository } = require('../services/scoringService');
const { generateReadme } = require('../services/llmService');
const logger = require('../utils/logger');
const { QUEUE_NAME } = require('../queues/generationQueue');

// ── Job Processor ─────────────────────────────────────────────────────────────
async function processJob(job) {
  const { logId, repoUrl, options = {}, userToken, preferences = {} } = job.data;

  logger.info(`[Job ${job.id}] Processing ${repoUrl}`);

  // ── Step 1: Mark as processing ─────────────────────────────────────────────
  await job.updateProgress(5);
  await GenerationLog.findByIdAndUpdate(logId, {
    status: 'processing',
    progress: 5,
  });

  // ── Step 2: Fetch GitHub metadata ──────────────────────────────────────────
  await job.updateProgress(20);
  const metadata = await fetchRepoMetadata(repoUrl, userToken);
  await GenerationLog.findByIdAndUpdate(logId, {
    repo_name: metadata.full_name,
    progress: 25,
  });
  logger.info(`[Job ${job.id}] Metadata fetched: ${metadata.full_name}`);

  // ── Step 3: Score repository ───────────────────────────────────────────────
  await job.updateProgress(40);
  const scoreData = scoreRepository(metadata);
  await GenerationLog.findByIdAndUpdate(logId, { progress: 45 });
  logger.info(`[Job ${job.id}] Score: ${scoreData.total_score}/100`);

  // ── Step 4: Generate README via LLM ───────────────────────────────────────
  await job.updateProgress(50);
  const generationOptions = {
    style: options.style || preferences.readme_style || 'standard',
    include_badges: options.include_badges ?? preferences.include_badges ?? true,
    include_toc: options.include_toc ?? preferences.include_toc ?? true,
    custom_sections: options.custom_sections || [],
    doc_tone: preferences.doc_tone || 'professional',
  };

  const { markdown, tokens_used, model_used } = await generateReadme(metadata, generationOptions);
  await job.updateProgress(90);
  logger.info(`[Job ${job.id}] README generated (${tokens_used} tokens, model: ${model_used})`);

  // ── Step 5: Persist result ─────────────────────────────────────────────────
  await GenerationLog.findByIdAndUpdate(logId, {
    status: 'completed',
    progress: 100,
    final_markdown: markdown,
    score: scoreData,
    generation_options: generationOptions,
  });

  await job.updateProgress(100);
  logger.info(`[Job ${job.id}] Completed successfully`);

  return {
    logId,
    total_score: scoreData.total_score,
    markdown_length: markdown.length,
    tokens_used,
  };
}

// ── Error handler ─────────────────────────────────────────────────────────────
async function handleJobFailure(job, err) {
  logger.error(`[Job ${job.id}] Failed: ${err.message}`);
  await GenerationLog.findByIdAndUpdate(job.data.logId, {
    status: 'failed',
    error_message: err.message,
    progress: 0,
  }).catch(() => {}); // Don't throw from error handler
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
async function startWorker() {
  await connectDB();
  await connectRedis();

  const worker = new Worker(QUEUE_NAME, processJob, {
    connection: getRedisClient(),
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || '3', 10),
    limiter: {
      max: 10,      // max 10 jobs
      duration: 60000, // per 60 seconds
    },
  });

  worker.on('completed', (job, result) => {
    logger.info(`Job ${job.id} completed:`, result);
  });

  worker.on('failed', handleJobFailure);

  worker.on('error', (err) => {
    logger.error('Worker error:', err.message);
  });

  logger.info(`Generation worker started (concurrency: ${worker.opts.concurrency})`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('Worker shutting down...');
    await worker.close();
    await mongoose.disconnect();
    process.exit(0);
  });
}

startWorker().catch((err) => {
  logger.error('Worker bootstrap failed:', err);
  process.exit(1);
});
