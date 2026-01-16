/**
 * @function errorMiddleware
 * @description
 * Centralized Express error-handling middleware.
 *
 * This middleware:
 * - Normalizes all thrown or forwarded errors into a consistent response shape
 * - Prevents internal error details from leaking to clients
 * - Handles known application and validation errors explicitly
 * - Acts as the final middleware in the request lifecycle
 *
 * All controllers and services should throw errors (or call `next(err)`)
 * and allow this middleware to translate them into HTTP responses.
 *
 * @middleware
 * @param {Error & { statusCode?: number }} err - Error object passed from the application
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function (unused, required by Express)
 *
 * @returns {Response} Standardized error response
 */

export const errorMiddleware = (err, req, res, next) => {
  /**
   * Create a safe, normalized error object.
   * This avoids mutating the original error instance.
   */
  const error = {
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
  };

  /**
   * Handle common known error types
   */

  // JWT authentication errors
  if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'Token expired';
  }

  // Request payload / validation errors (example pattern)
  if (err.name === 'ValidationError') {
    error.statusCode = 400;
    error.message = err.message;
  }

  /**
   * Log error for observability (safe for development).
   * In production, this should be routed to a logger
   * such as Winston, Pino, or a monitoring service.
   */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  /**
   * Send standardized error response
   */
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
