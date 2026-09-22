// Consistent response shape across every endpoint: { success, data, message }
export function sendSuccess(res, { data = null, message = '', statusCode = 200, meta } = {}) {
  const body = { success: true, message, data }
  if (meta) body.meta = meta
  res.status(statusCode).json(body)
}