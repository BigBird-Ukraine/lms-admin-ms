import { Router } from 'express';

import { checkAccessTokenMiddleware } from '../../middleware/auth/checkAccessToken.middleware';
import { authRouter } from '../auth';
import { courseRouter } from '../course';
import { groupRouter } from '../group';
import { userRouter } from '../user';

const router = Router();
router.use('/auth', authRouter);

router.use(checkAccessTokenMiddleware);
router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/courses', courseRouter);

export const apiRouter = router;
