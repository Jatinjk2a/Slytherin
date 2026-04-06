const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Build a rate limiter. Always uses memory store (Redis store optional upgrade).
 */
function buildLimiter(options) {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: { success: false, error: options.message || 'Too many requests. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
}

// ── Prebuilt limiters ─────────────────────────────────────────────────────────
const globalRateLimiter = buildLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message: 'Too many requests from this IP. Please wait before retrying.',
});

const authRateLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many auth attempts. Please wait 15 minutes.',
});

const generateRateLimiter = buildLimiter({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Generation limit reached. Max 10 requests per minute.',
});

module.exports = { globalRateLimiter, authRateLimiter, generateRateLimiter };
