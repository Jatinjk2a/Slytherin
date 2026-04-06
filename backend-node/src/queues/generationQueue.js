const { Queue } = require('bullmq');
const { getRedisClient } = require('../config/redis');
const logger = require('../utils/logger');

const QUEUE_NAME = 'readme-generation';

let queue = null;

function getGenerationQueue() {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, {
      connection: getRedisClient(),
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: { count: 500 },
        removeOnFail: { count: 200 },
      },
    });

    queue.on('error', (err) => logger.error('Queue error:', err.message));
  }
  return queue;
}

/**
 * Enqueue a README generation job
 * @param {object} payload - Job data
 * @param {string} payload.logId - GenerationLog MongoDB _id
 * @param {string} payload.userId - User MongoDB _id
 * @param {string} payload.repoUrl
 * @param {object} payload.options - Generation options
 * @param {string} [payload.userToken] - GitHub OAuth token (for private repos)
 * @param {object} [payload.preferences] - User preferences
 */
async function enqueueGeneration(payload) {
  const q = getGenerationQueue();
  const job = await q.add('generate', payload, {
    jobId: payload.logId, // Use MongoDB ID as job ID for easy lookup
  });
  logger.info(`Job ${job.id} enqueued for ${payload.repoUrl}`);
  return job;
}

/**
 * Get job state and progress
 */
async function getJobStatus(jobId) {
  const q = getGenerationQueue();
  const job = await q.getJob(jobId);
  if (!job) return null;

  const state = await job.getState();
  return {
    id: job.id,
    state,
    progress: job.progress,
    data: job.data,
    failedReason: job.failedReason,
    finishedOn: job.finishedOn,
    processedOn: job.processedOn,
  };
}

module.exports = { getGenerationQueue, enqueueGeneration, getJobStatus, QUEUE_NAME };
