import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '../database/index.js';
import { generateAccessToken, generateRefreshToken } from '../util/index.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  res.json({ accessToken, refreshToken });
};

export const refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  const user = users.find((u) => u.refreshToken === refreshToken);
  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};
