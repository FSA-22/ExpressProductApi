// Node modules
import { Router } from 'express';

// Custom module
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.js';
import { authorize } from '../middleware/authorize.js';
import { authenticate } from '../middleware/authentication.js';
import upload from '../middleware/upload.js';
import {
  createProductLimiter,
  generalLimiter,
} from '../middleware/rateLimit.middleware.js';
import {
  createProductValidator,
  productIdValidator,
} from '../validators/product.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const productRouter = Router();

productRouter.post(
  '/',
  createProductLimiter,
  authenticate,
  authorize('admin'),
  upload.single('image'),
  createProductValidator,
  validate,
  createProduct,
);

productRouter.get(
  '/',
  generalLimiter,
  authenticate,
  authorize('admin', 'user'),
  getProducts,
);

productRouter.get(
  '/:id',
  generalLimiter,
  authenticate,
  authorize('admin'),
  productIdValidator,
  validate,
  getOneProduct,
);

productRouter.put(
  '/:id',
  authenticate,
  authorize('admin'),
  productIdValidator,
  validate,
  updateProduct,
);

productRouter.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  productIdValidator,
  validate,
  deleteProduct,
);

export default productRouter;
