/**
 * @function authorize
 * @description
 * Factory function that creates an Express middleware for
 * role-based authorization.
 *
 * This middleware:
 * - Assumes a previously authenticated request (`req.user` is populated)
 * - Checks whether the authenticated user's role is permitted
 * - Prevents access to protected routes when the role is not authorized
 *
 * Typical usage:
 * ```js
 * router.post(
 *   '/admin-only',
 *   authenticate,
 *   authorize('admin'),
 *   controller
 * );
 * ```
 *
 * @middleware
 * @param {...string} roles - List of roles permitted to access the route
 *
 * @returns {Function} Express middleware enforcing role-based access control
 *
 * @returns {403} Forbidden when user role is not authorized
 */

export const authorize =
  (...roles) =>
  (req, res, next) => {
    // Ensure user role is allowed to access this resource
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Role is authorized; proceed to next middleware/handler
    return next();
  };
