import { Router } from 'express';

import { courseController } from '../../controllers';
import { isCoursePresent } from '../../middleware';

const router = Router();

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);

router.use('/:course_id', isCoursePresent);
router.get('/:course_id', courseController.getCourseById);
router.patch('/:course_id', courseController.editCourse);
router.delete('/:course_id', courseController.deleteCourseById);

export const courseRouter = router;
