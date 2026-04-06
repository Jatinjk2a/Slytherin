const passport = require('passport');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const logger = require('../utils/logger');

// ── JWT Strategy ──────────────────────────────────────────────────────────────
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub).select('-password_hash');
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// ── GitHub OAuth Strategy ─────────────────────────────────────────────────────
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email', 'repo'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `${profile.username}@github.com`;

          let user = await User.findOne({ github_id: profile.id });

          if (!user) {
            // Check if email already registered via password
            user = await User.findOne({ email });
            if (user) {
              // Link GitHub account to existing user
              user.github_id = profile.id;
              user.github_token = accessToken;
              user.avatar_url = profile.photos?.[0]?.value || user.avatar_url;
              await user.save();
            } else {
              // Create new user from GitHub profile
              user = await User.create({
                email,
                full_name: profile.displayName || profile.username,
                avatar_url: profile.photos?.[0]?.value,
                github_id: profile.id,
                github_token: accessToken,
              });
            }
          } else {
            // Update token on each login
            user.github_token = accessToken;
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          logger.error('GitHub OAuth error:', err);
          return done(err, null);
        }
      }
    )
  );
} else {
  logger.warn('GitHub OAuth not configured — GITHUB_CLIENT_ID/SECRET missing');
}
