import { Router } from 'express';

import { authRouter } from '../auth';
import { courseRouter } from '../course';
import { groupRouter } from '../group';
import { moduleRouter } from '../module';
import { userRouter } from '../user';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/groups', groupRouter);
router.use('/courses', courseRouter);
router.use('/modules', moduleRouter);

export const apiRouter = router;
