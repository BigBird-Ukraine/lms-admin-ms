import { Router } from 'express';

import { courseController } from '../../controllers';
import { isCoursePresent } from '../../middleware';
import { isCourseFilterValid, isCourseValid, isUpdateModuleListValid } from '../../middleware/course/validators';
import { isUpdateCourseValid } from '../../middleware/course/validators';

const router = Router();

router.post('/', isCourseValid, courseController.createCourse);
router.get('/', isCourseFilterValid, courseController.getCourses);

router.use('/:course_id', isCoursePresent);
router.get('/:course_id', courseController.getCourseById);
router.patch('/:course_id', isUpdateModuleListValid, courseController.updateModulesList);
router.post('/:course_id', isUpdateCourseValid, courseController.updateById);
router.delete('/:course_id', courseController.deleteCourseById);

export const courseRouter = router;
