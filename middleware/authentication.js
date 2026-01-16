import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

/**
 * @function authenticate
 * @description
 * Express middleware responsible for authenticating incoming requests
 * using a JWT access token.
 *
 * This middleware:
 * - Extracts the `Authorization` header
 * - Validates the `Bearer <token>` format
 * - Verifies the JWT signature and expiration
 * - Attaches the decoded token payload to `req.user`
 *
 * Requests that fail authentication are rejected before reaching
 * protected route handlers.
 *
 * @middleware
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 *
 * @returns {401} Unauthorized when token is missing or malformed
 * @returns {401} Invalid token when verification fails
 */
export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  // Ensure Authorization header exists and follows Bearer scheme
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Extract token from "Bearer <token>"
    const token = header.split(' ')[1];

    // Verify token integrity and attach payload to request
    req.user = jwt.verify(token, JWT_SECRET);

    // Allow request to proceed to the next middleware/handler
    return next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: 'Invalid token' });
  }
};
