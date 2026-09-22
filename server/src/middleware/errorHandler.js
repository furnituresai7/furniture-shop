// A small custom error class controllers can throw with a specific status code
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

// Catches routes that don't match any defined route
export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

// Central error handler. Must be registered last, after all routes.
export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Server error'

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map((item) => item.message).join(', ')
  }

  // Invalid MongoDB ObjectId in a URL param
  if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  // Duplicate key (e.g. a slug that already exists)
  if (err.code === 11000) {
    statusCode = 409
    message = 'A record with this value already exists'
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Stack traces only in development. Never expose them in production.
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}