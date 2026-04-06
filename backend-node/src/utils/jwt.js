const jwt = require('jsonwebtoken');

const JWT_SECRET = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable not set');
  return secret;
};

/**
 * Sign a JWT payload
 * @param {object} payload - Data to encode (should include sub: userId)
 * @param {string} [expiresIn] - Expiry override (default from env)
 */
function signToken(payload, expiresIn) {
  return jwt.sign(payload, JWT_SECRET(), {
    expiresIn: expiresIn || process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'readme-ai',
  });
}

/**
 * Verify and decode a JWT
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET(), { issuer: 'readme-ai' });
}

/**
 * Generate a token pair for a user document
 */
function generateTokensForUser(user) {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
  };

  const accessToken = signToken(payload, process.env.JWT_EXPIRES_IN || '7d');
  return { accessToken };
}

module.exports = { signToken, verifyToken, generateTokensForUser };
