import { config } from 'dotenv';

config({ path: '.env.local' });

export const {
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} = process.env;
