const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password_hash: {
      type: String,
      select: false, // Never returned in queries unless explicitly included
    },
    full_name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name too long'],
    },
    avatar_url: String,
    github_id: {
      type: String,
    },
    github_token: {
      type: String,
      select: false, // Sensitive — never expose in default queries
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    reset_password_token: { type: String, select: false },
    reset_password_expires: { type: Date, select: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
// Note: email unique + github_id sparse are declared in the schema definition above
userSchema.index({ github_id: 1 }, { sparse: true, unique: true });

// ── Hash password before save ─────────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

// ── Instance methods ──────────────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password_hash);
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password_hash;
  delete obj.github_token;
  delete obj.reset_password_token;
  delete obj.reset_password_expires;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
