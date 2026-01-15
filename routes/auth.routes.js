import { Router } from 'express';
import { login, refresh, signUp } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/signUp', signUp);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);

export default authRouter;
