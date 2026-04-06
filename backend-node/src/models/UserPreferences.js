const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    doc_tone: {
      type: String,
      enum: ['professional', 'casual', 'technical', 'minimal'],
      default: 'professional',
    },
    readme_style: {
      type: String,
      enum: ['standard', 'minimal', 'detailed', 'badges-heavy'],
      default: 'standard',
    },
    ignored_paths: {
      type: [String],
      default: ['node_modules', '.git', 'dist', 'build', '__pycache__'],
    },
    include_badges: { type: Boolean, default: true },
    include_toc: { type: Boolean, default: true },
    ui_theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    email_notifications: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
