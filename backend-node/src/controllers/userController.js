const UserPreferences = require('../models/UserPreferences');
const { successResponse, errorResponse } = require('../utils/response');

// GET /api/user/preferences
async function getPreferences(req, res) {
  let prefs = await UserPreferences.findOne({ user_id: req.user._id }).lean();

  if (!prefs) {
    // Create default if missing
    prefs = await UserPreferences.create({ user_id: req.user._id });
  }

  return successResponse(res, prefs);
}

// PUT /api/user/preferences
async function updatePreferences(req, res) {
  const prefs = await UserPreferences.findOneAndUpdate(
    { user_id: req.user._id },
    { $set: req.body },
    { new: true, upsert: true, runValidators: true }
  );

  return successResponse(res, prefs);
}

// GET /api/user/profile
async function getProfile(req, res) {
  return successResponse(res, { user: req.user.toSafeObject() });
}

module.exports = { getPreferences, updatePreferences, getProfile };
