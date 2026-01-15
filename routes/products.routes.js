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

const productRouter = Router();

productRouter.post(
  '/',
  authenticate,
  authorize('admin', 'user'),
  createProduct,
);

productRouter.get('/', authenticate, authorize('admin', 'user'), getProducts);

productRouter.get(
  '/:id',
  authenticate,
  authorize('admin', 'user'),
  getOneProduct,
);

productRouter.put(
  '/:id',
  authenticate,
  authorize('admin', 'user'),
  updateProduct,
);

productRouter.delete(
  '/:id',
  authenticate,
  authorize('admin', 'user'),
  deleteProduct,
);

export default productRouter;
