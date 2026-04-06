const router = require('express').Router();
const {
  startGeneration,
  getStatus,
  getResult,
  downloadReadme,
  regenerate,
} = require('../controllers/generateController');
const { requireAuth } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');
const { generateRateLimiter } = require('../middlewares/rateLimiter');

// All generation routes require auth
router.use(requireAuth);

// POST /api/generate
router.post('/', generateRateLimiter, validate(schemas.generate), startGeneration);

// POST /api/generate/regenerate  (must be before /:job_id routes)
router.post('/regenerate', validate(schemas.regenerate), regenerate);

// GET /api/generate/:job_id/status
router.get('/:job_id/status', getStatus);

// GET /api/generate/:job_id/result
router.get('/:job_id/result', getResult);

// GET /api/generate/:job_id/download?format=md
router.get('/:job_id/download', downloadReadme);

module.exports = router;
