import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// File size limit (for later use)
// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Automatically uploads images to Cloudinary
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

export default upload;
