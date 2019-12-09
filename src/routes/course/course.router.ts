import { Router } from 'express';

import { courseController } from '../../controllers';
// import { checkIsAdmin } from '../../middleware';

const router = Router();

router.get('/', courseController.getAllCourses);

// router.use(checkIsAdmin);
router.post('/', courseController.createCourse);
router.patch('/:course_id', courseController.editCourse);

export const courseRouter = router;
