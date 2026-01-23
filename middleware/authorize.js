export const authorize =
  (...roles) =>
  (req, res, next) => {
    // Ensure user role is allowed to access this resource
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Role is authorized; proceed to next middleware/handler
    return next();
  };
