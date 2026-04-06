const Joi = require('joi');

/**
 * Middleware factory — validates req.body against a Joi schema.
 * Returns 422 with field-level errors on failure.
 */
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message.replace(/['"]/g, ''),
      }));
      return res.status(422).json({ success: false, error: 'Validation failed', details });
    }

    req.body = value;
    return next();
  };
}

/**
 * Validate query params
 */
function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message.replace(/['"]/g, ''),
      }));
      return res.status(422).json({ success: false, error: 'Validation failed', details });
    }

    req.query = value;
    return next();
  };
}

// ── Shared validation schemas ─────────────────────────────────────────────────
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    full_name: Joi.string().min(2).max(100).optional(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  generate: Joi.object({
    repo_url: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .pattern(/github\.com/)
      .required()
      .messages({
        'string.pattern.base': 'repo_url must be a valid GitHub repository URL',
      }),
    style: Joi.string()
      .valid('standard', 'minimal', 'detailed', 'badges-heavy')
      .default('standard'),
    include_badges: Joi.boolean().default(true),
    include_toc: Joi.boolean().default(true),
    custom_sections: Joi.array().items(Joi.string()).default([]),
  }),

  pushReadme: Joi.object({
    log_id: Joi.string().required(),
    commit_message: Joi.string().max(200).default('docs: update README via README AI'),
    branch: Joi.string().default('main'),
  }),

  preferences: Joi.object({
    doc_tone: Joi.string().valid('professional', 'casual', 'technical', 'minimal'),
    readme_style: Joi.string().valid('standard', 'minimal', 'detailed', 'badges-heavy'),
    ignored_paths: Joi.array().items(Joi.string()),
    include_badges: Joi.boolean(),
    include_toc: Joi.boolean(),
    ui_theme: Joi.string().valid('light', 'dark', 'system'),
    email_notifications: Joi.boolean(),
  }),
};

module.exports = { validate, validateQuery, schemas };
