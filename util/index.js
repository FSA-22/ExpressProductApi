import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRES,
} from './config/env.js';

export const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
