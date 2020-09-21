import { Router } from 'express';

import { checkAccessTokenMiddleware , checkIsAdmin } from '../../middleware';
import { authRouter } from '../auth';
import { cityRouter } from '../city';
import { courseRouter } from '../course';
import { groupRouter } from '../group';
import { lessonRouter } from '../lesson';
import { moduleRouter } from '../module';
import { questionRouter } from '../question';
import { roomRouter } from '../room';
import { userRouter } from '../user';

const router = Router();
router.use('/auth', authRouter);

router.use(checkAccessTokenMiddleware, checkIsAdmin);
router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/courses', courseRouter);
router.use('/modules', moduleRouter);
router.use('/lessons', lessonRouter);
router.use('/questions', questionRouter);
router.use('/cities', cityRouter);
router.use('/rooms', roomRouter);

export const apiRouter = router;
