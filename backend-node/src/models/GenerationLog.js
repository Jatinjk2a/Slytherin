const mongoose = require('mongoose');

// ── Embedded score schema ─────────────────────────────────────────────────────
const scoreSchema = new mongoose.Schema(
  {
    total_score: { type: Number, min: 0, max: 100 },
    readme_quality: { type: Number, default: 0 },
    code_structure: { type: Number, default: 0 },
    activity: { type: Number, default: 0 },
    documentation: { type: Number, default: 0 },
    test_coverage: { type: Number, default: 0 },
    security: { type: Number, default: 0 },
    readability: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    vulnerabilities: { type: Number, default: 0 },
    coverage_summary: { type: String, default: 'Unknown' },
  },
  { _id: false }
);

// ── Main schema ───────────────────────────────────────────────────────────────
const generationLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    repo_url: {
      type: String,
      required: true,
      trim: true,
    },
    repo_name: String,
    final_markdown: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['queued', 'processing', 'completed', 'failed'],
      default: 'queued',
      index: true,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    error_message: String,
    score: scoreSchema,
    // Options used during generation
    generation_options: {
      style: { type: String, default: 'standard' },
      include_badges: { type: Boolean, default: true },
      include_toc: { type: Boolean, default: true },
      custom_sections: [String],
    },
    job_id: String, // BullMQ job ID for status polling
    repo_metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    tokens_used: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// ── Compound indexes ──────────────────────────────────────────────────────────
generationLogSchema.index({ user_id: 1, created_at: -1 });
generationLogSchema.index({ repo_url: 1, user_id: 1 });
generationLogSchema.index({ job_id: 1 });

module.exports = mongoose.model('GenerationLog', generationLogSchema);
