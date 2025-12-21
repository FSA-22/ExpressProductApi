// Node modules
import { Router } from 'express';

// Custom module
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from '../controller/controller.products.js';

const productRouter = Router();

productRouter.post('/', createProduct);

productRouter.get('/', getProducts);

productRouter.get('/:id', getOneProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

export default productRouter;
