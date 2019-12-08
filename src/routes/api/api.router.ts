import { Router } from 'express';

import { authRouter } from '../auth';
import { userRouter } from '../user';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export const apiRouter = router;
