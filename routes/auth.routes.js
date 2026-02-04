import { Router } from 'express';
import { login, logout, refresh, signUp } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

export default authRouter;
