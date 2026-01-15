import { Router } from 'express';
import { login, refresh } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/refresh', refresh);

export default authRouter;
