const router = require('express').Router();
const { getPreferences, updatePreferences, getProfile } = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');

router.use(requireAuth);

// GET  /api/user/profile
router.get('/profile', getProfile);

// GET  /api/user/preferences
router.get('/preferences', getPreferences);

// PUT  /api/user/preferences
router.put('/preferences', validate(schemas.preferences), updatePreferences);

module.exports = router;
