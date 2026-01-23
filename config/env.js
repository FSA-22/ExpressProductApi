import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config({ path: '.env.local' });

export const {
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MONGODB_URI,
} = process.env;

export default cloudinary;
