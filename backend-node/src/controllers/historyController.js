const GenerationLog = require('../models/GenerationLog');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

// GET /api/history
async function getHistory(req, res) {
  const userId = req.user._id;
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);
  const skip = (page - 1) * limit;
  const status = req.query.status; // optional filter

  const filter = { user_id: userId };
  if (status) filter.status = status;

  const [logs, total] = await Promise.all([
    GenerationLog.find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .select('repo_url repo_name status progress score.total_score score.readability created_at generation_options')
      .lean(),
    GenerationLog.countDocuments(filter),
  ]);

  const formatted = logs.map((l) => ({
    id: l._id,
    repo_url: l.repo_url,
    repo_name: l.repo_name,
    status: l.status,
    progress: l.progress,
    score: l.score?.total_score ?? null,
    readability: l.score?.readability ?? null,
    style: l.generation_options?.style,
    created_at: l.created_at,
  }));

  return paginatedResponse(res, formatted, total, page, limit);
}

// DELETE /api/history/:id
async function deleteHistoryEntry(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  const log = await GenerationLog.findOneAndDelete({ _id: id, user_id: userId });
  if (!log) return errorResponse(res, 'Record not found', 404);

  return successResponse(res, { message: 'Record deleted', id });
}

// GET /api/history/stats
async function getStats(req, res) {
  const userId = req.user._id;

  const [total, completed, avgScore] = await Promise.all([
    GenerationLog.countDocuments({ user_id: userId }),
    GenerationLog.countDocuments({ user_id: userId, status: 'completed' }),
    GenerationLog.aggregate([
      { $match: { user_id: userId, status: 'completed' } },
      { $group: { _id: null, avg: { $avg: '$score.total_score' } } },
    ]),
  ]);

  return successResponse(res, {
    total_generations: total,
    completed,
    failed: total - completed,
    avg_score: avgScore[0]?.avg ? Math.round(avgScore[0].avg) : null,
  });
}

module.exports = { getHistory, deleteHistoryEntry, getStats };
