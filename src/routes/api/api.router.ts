import { Router } from 'express';

import { authRouter } from '../auth';
import { courseRouter } from '../course';
import { userRouter } from '../user';
import { groupRouter } from '../group';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/groups', groupRouter);
router.use('/courses', courseRouter);

export const apiRouter = router;
