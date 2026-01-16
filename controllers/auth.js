import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '../database/index.js';
import { generateAccessToken, generateRefreshToken } from '../util/index.js';

/**
 * @function signUp
 * @description
 * Registers a new user in the system.
 *
 * This handler:
 * - Validates username uniqueness
 * - Hashes the user password using bcrypt
 * - Creates a new user with a default role of `user`
 * - Stores the user in an in-memory data store
 *
 *  Note:
 * - This uses an in-memory array and is intended for assignments.
 * - In production, persistence and stronger validation are required.
 *
 * @route POST /auth/signup
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {201} User created successfully
 * @returns {400} Username already exists
 */

export const signUp = (req, res) => {
  const { name, username, password, role } = req.body;

  // Check for existing user with the same username
  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash password before storing (never store plain-text passwords)
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Create new user object
  const newUser = {
    id: users.length + 1,
    name,
    username,
    password: hashedPassword,
    role: role || 'user',
    refreshToken: null, // Will be set on login
  };

  // Persist user in memory
  users.push(newUser);

  return res.status(201).json({ message: 'User created successfully' });
};

/**
 * @function login
 * @description
 * Authenticates a user and issues JWT access and refresh tokens.
 *
 * This handler:
 * - Verifies username and password
 * - Generates short-lived access token and long-lived refresh token
 * - Persists refresh token server-side for future validation
 *
 * @route POST /auth/login
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} Access token, refresh token, and user profile
 * @returns {401} Invalid credentials
 */
export const login = (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((u) => u.username === username);

  // Validate credentials
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Persist refresh token to allow revocation
  user.refreshToken = refreshToken;

  return res.json({
    accessToken,
    refreshToken,
    data: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  });
};

/**
 * @function refresh
 * @description
 * Issues a new access token using a valid refresh token.
 *
 * This handler:
 * - Validates presence of refresh token
 * - Confirms token exists server-side
 * - Verifies token signature and expiration
 * - Generates a new access token without re-authentication
 *
 * @route POST /auth/refresh
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} New access token
 * @returns {401} Refresh token missing
 * @returns {403} Invalid or expired refresh token
 */
export const refresh = (req, res) => {
  const { refreshToken } = req.body;

  // Ensure refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  // Validate refresh token against stored tokens
  const user = users.find((u) => u.refreshToken === refreshToken);

  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  // Verify refresh token signature and expiry
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Issue new access token
    const newAccessToken = generateAccessToken(user);
    return res.json({ accessToken: newAccessToken });
  });
};
