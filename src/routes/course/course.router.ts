import { Router } from 'express';

import { courseController } from '../../controllers';
import { isCoursePresent } from '../../middleware';

const router = Router();

router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);

router.use('/:course_id', isCoursePresent);
router.get('/:course_id', courseController.getCourseById);
router.patch('/:course_id', courseController.updateModulesList);
router.post('/:course_id', courseController.updateById);
router.delete('/:course_id', courseController.deleteCourseById);

export const courseRouter = router;
