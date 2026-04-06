const { Redis } = require('ioredis');
const logger = require('../utils/logger');

let redisClient = null;
let redisAvailable = false;

function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null, // Required by BullMQ
      retryStrategy: (times) => {
        // Stop retrying after 3 attempts in dev — Redis may not be installed
        if (times > 3) return null;
        return Math.min(times * 200, 1000);
      },
      lazyConnect: true,
      enableOfflineQueue: false,
    });

    redisClient.on('connect', () => {
      redisAvailable = true;
      logger.info('Redis connected');
    });
    redisClient.on('error', (err) => {
      if (redisAvailable || err.code !== 'ECONNREFUSED') {
        logger.error('Redis error:', err.message);
      }
      redisAvailable = false;
    });
    redisClient.on('reconnecting', () => logger.warn('Redis reconnecting...'));
  }
  return redisClient;
}

async function connectRedis() {
  const client = getRedisClient();
  try {
    await client.connect();
    redisAvailable = true;
    logger.info('Redis ready');
  } catch (err) {
    if (err.message.includes('already')) {
      redisAvailable = true;
      return;
    }
    logger.warn(`Redis unavailable (${err.message}) — running in sync/memory mode`);
    redisAvailable = false;
  }
}

function isRedisAvailable() {
  return redisAvailable;
}

module.exports = { getRedisClient, connectRedis, isRedisAvailable };
