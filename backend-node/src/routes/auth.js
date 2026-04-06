const router = require('express').Router();
const passport = require('passport');
const { register, login, resetPassword, getMe, githubCallback } = require('../controllers/authController');
const { requireAuth } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');
const { authRateLimiter } = require('../middlewares/rateLimiter');

// POST /api/auth/register
router.post('/register', authRateLimiter, validate(schemas.register), register);

// POST /api/auth/login
router.post('/login', authRateLimiter, validate(schemas.login), login);

// POST /api/auth/reset-password
router.post('/reset-password', authRateLimiter, validate(schemas.resetPassword), resetPassword);

// GET /api/auth/me
router.get('/me', requireAuth, getMe);

// GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { session: false, scope: ['user:email', 'repo'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/api/auth/github/failure' }),
  githubCallback
);

router.get('/github/failure', (req, res) => {
  res.status(401).json({ success: false, error: 'GitHub authentication failed' });
});

module.exports = router;
