import { Router } from 'express';

import { courseController } from '../../controllers';
import {checkAccessTokenMiddleware, checkIsAdmin} from '../../middleware';

const router = Router();

router.get('/', courseController.getAllCourses);

router.use(checkAccessTokenMiddleware, checkIsAdmin);

router.post('/', courseController.createCourse);
router.patch('/:course_id', courseController.editCourse);

export const courseRouter = router;
