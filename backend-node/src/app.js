const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');

const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const { globalRateLimiter } = require('./middlewares/rateLimiter');

// Routes
const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');
const historyRoutes = require('./routes/history');
const scoreRoutes = require('./routes/score');
const userRoutes = require('./routes/user');
const githubRoutes = require('./routes/github');

// Passport config
require('./config/passport');

const app = express();

// ── Security & Parsing ────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) },
}));

// ── Timing Header ─────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  // Intercept write to inject header before first byte is flushed
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  const injectTiming = () => {
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${Date.now() - start}ms`);
    }
  };

  res.write = (...args) => { injectTiming(); return originalWrite(...args); };
  res.end = (...args) => { injectTiming(); return originalEnd(...args); };

  next();
});

// ── Passport ──────────────────────────────────────────────────────────────────
app.use(passport.initialize());

// ── Rate Limiting (global) ────────────────────────────────────────────────────
app.use(globalRateLimiter);

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service: 'README AI',
    version: '1.0.0',
    status: 'running',
    docs: '/api/docs',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/repo', scoreRoutes);
app.use('/api/user', userRoutes);
app.use('/api/github', githubRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
