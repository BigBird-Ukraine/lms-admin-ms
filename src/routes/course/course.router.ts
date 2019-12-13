import { Router } from 'express';

import { courseController } from '../../controllers';

const router = Router();

router.get('/', courseController.getAllCourses);

router.post('/', courseController.createCourse);
router.patch('/:course_id', courseController.editCourse);

export const courseRouter = router;
