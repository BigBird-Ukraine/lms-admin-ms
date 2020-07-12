import { Router } from 'express';

import { lessonController } from '../../controllers';
import { isLessonFilterValid } from '../../middleware/lesson';

const router = Router();

router.post('/', lessonController.createLesson);
router.get('/', isLessonFilterValid, lessonController.getLessons);

export const lessonRouter = router;
