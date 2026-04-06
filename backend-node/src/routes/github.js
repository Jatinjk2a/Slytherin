const router = require('express').Router();
const { pushReadme, listRepos } = require('../controllers/githubController');
const { requireAuth } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');

router.use(requireAuth);

// POST /api/github/push-readme
router.post('/push-readme', validate(schemas.pushReadme), pushReadme);

// GET  /api/github/repos
router.get('/repos', listRepos);

module.exports = router;
