const User = require('../models/User');
const UserPreferences = require('../models/UserPreferences');
const { generateTokensForUser } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

// POST /api/auth/register
async function register(req, res) {
  const { email, password, full_name } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return errorResponse(res, 'Email already registered', 409);

  const user = await User.create({
    email,
    password_hash: password, // Pre-save hook hashes this
    full_name: full_name || '',
  });

  // Create default preferences
  await UserPreferences.create({ user_id: user._id });

  const { accessToken } = generateTokensForUser(user);

  logger.info(`New user registered: ${email}`);

  return successResponse(
    res,
    { user: user.toSafeObject(), access_token: accessToken },
    201
  );
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;

  // Explicitly include password_hash since it's select:false
  const user = await User.findOne({ email }).select('+password_hash');
  if (!user) return errorResponse(res, 'Invalid credentials', 401);

  if (!user.password_hash) {
    return errorResponse(res, 'Please sign in with GitHub (no password set)', 400);
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) return errorResponse(res, 'Invalid credentials', 401);

  const { accessToken } = generateTokensForUser(user);

  return successResponse(res, {
    user: user.toSafeObject(),
    access_token: accessToken,
  });
}

// POST /api/auth/reset-password
async function resetPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always return 200 to prevent email enumeration
  if (!user) {
    return successResponse(res, { message: 'If that email exists, a reset link was sent.' });
  }

  // In production: generate token, store hashed, send email
  // For MVP: just acknowledge
  logger.info(`Password reset requested for ${email}`);

  return successResponse(res, { message: 'If that email exists, a reset link was sent.' });
}

// GET /api/auth/me
async function getMe(req, res) {
  return successResponse(res, { user: req.user.toSafeObject() });
}

// GitHub OAuth callback — called by passport, issues JWT
function githubCallback(req, res) {
  const { accessToken } = generateTokensForUser(req.user);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  // Redirect with token in query param (frontend reads and stores it)
  return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
}

module.exports = { register, login, resetPassword, getMe, githubCallback };
