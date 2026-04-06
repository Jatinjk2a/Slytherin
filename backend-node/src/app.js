const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

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
app.use(helmet({
  // Relax CSP in dev so the SPA can load fonts/scripts from CDNs
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));
app.use(cors({
  // In dev, reflect the request origin so file://, localhost:*, etc. all work.
  // In production, restrict to FRONTEND_URL.
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || false)
    : true,
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

// ── Static frontend ───────────────────────────────────────────────────────────
// Serve the /frontend folder from the root so http://localhost:5000 loads the UI.
const FRONTEND_DIR = path.join(__dirname, '../../frontend');
app.use(express.static(FRONTEND_DIR));

// ── Health ────────────────────────────────────────────────────────────────────
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

// ── SPA fallback — serve index.html for any non-API route ────────────────────
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
