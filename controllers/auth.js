import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../util/index.js';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    await User.create({
      name,
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    return res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    // Find user with this refresh token
    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = generateAccessToken(user);
      return res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token required' });
  }

  try {
    // Find user with this refresh token
    const user = await User.findOne({ refreshToken });

    if (!user) {
      // Token already invalid or reused
      return res.status(200).json({
        message: 'User already logged out',
      });
    }

    // Invalidate refresh token
    user.refreshToken = null;
    await user.save();

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
