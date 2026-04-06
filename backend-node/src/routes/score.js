const router = require('express').Router();
const { getScoreByLogId, scoreByUrl, getLeaderboard } = require('../controllers/scoreController');
const { requireAuth } = require('../middlewares/auth');

// GET /api/repo/leaderboard  (public)
router.get('/leaderboard', getLeaderboard);

// All below require auth
router.use(requireAuth);

// GET /api/repo/score?url=...
router.get('/score', scoreByUrl);

// GET /api/repo/:id/score
router.get('/:id/score', getScoreByLogId);

module.exports = router;
