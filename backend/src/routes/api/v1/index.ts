import express from 'express';

import { todoRouter } from './todo.router';
import { authRouter } from './auth.router';
import { userRouter } from './user.router';

const router = express.Router();
const NAMESPACE = 'v1';

router.use(`/${NAMESPACE}/todos`, todoRouter);
router.use(`/${NAMESPACE}/auth`, authRouter);
router.use(`/${NAMESPACE}/users`, userRouter);

export default router;
