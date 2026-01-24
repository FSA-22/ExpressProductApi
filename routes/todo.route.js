import { Router } from 'express';
import { getTodo } from '../controllers/todo.controller.js';
import { authenticate } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorize.js';

const todoRouter = Router();

todoRouter.get('/', authenticate, authorize('admin', 'user'), getTodo);

export default todoRouter;
