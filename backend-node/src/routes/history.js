const router = require('express').Router();
const { getHistory, deleteHistoryEntry, getStats } = require('../controllers/historyController');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

// GET  /api/history
router.get('/', getHistory);

// GET  /api/history/stats
router.get('/stats', getStats);

// DELETE /api/history/:id
router.delete('/:id', deleteHistoryEntry);

module.exports = router;
