import { Router } from 'express';

import { courseController } from '../../controllers';
import { isCoursePresent } from '../../middleware/course';

const router = Router();

router.get('/', courseController.getAllCourses);
router.get('/:course_id', courseController.getCourseById);

router.post('/', courseController.createCourse);

router.patch('/:course_id', isCoursePresent, courseController.editCourse);

router.delete('/:course_id', isCoursePresent, courseController.deleteCourseById);

export const courseRouter = router;
