import { Router } from 'express';

import { courseController } from '../../controllers';

const router = Router();

router.get('/', courseController.getAllCourses);
router.get('/:course_id', courseController.getCourseById);

router.post('/', courseController.createCourse);

router.patch('/:course_id', courseController.editCourse);

router.delete('/:course_id', courseController.deleteCourseById);

export const courseRouter = router;
