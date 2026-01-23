import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  // Ensure Authorization header exists and follows Bearer scheme
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Extract token from "Bearer <token>"
    const token = header.split(" ")[1];

    // Verify token integrity and attach payload to request
    req.user = jwt.verify(token, JWT_SECRET);
    console.log(req.user);

    // Allow request to proceed to the next middleware/handler
    return next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: "Invalid token" });
  }
};
