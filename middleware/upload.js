import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// File size limit
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Automatically uploads images to Cloudinary
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `products/${req.user.id}`,
    allowed_formats: ['jpg', 'png', 'webp'],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;
