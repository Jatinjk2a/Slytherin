const passport = require('passport');
const { errorResponse } = require('../utils/response');

/**
 * Require a valid JWT Bearer token.
 * Attaches `req.user` on success.
 */
function requireAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      const message = info?.message || 'Authentication required';
      return errorResponse(res, message, 401);
    }
    req.user = user;
    return next();
  })(req, res, next);
}

/**
 * Optional auth — attaches user if token present but doesn't block.
 */
function optionalAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!err && user) req.user = user;
    return next();
  })(req, res, next);
}

module.exports = { requireAuth, optionalAuth };
