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

const productRouter = Router();

productRouter.post(
  '/',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  createProduct,
);

productRouter.get('/', authenticate, authorize('admin', 'user'), getProducts);

productRouter.get('/:id', authenticate, authorize('admin'), getOneProduct);

productRouter.put('/:id', authenticate, authorize('admin'), updateProduct);

productRouter.delete('/:id', authenticate, authorize('admin'), deleteProduct);

export default productRouter;
