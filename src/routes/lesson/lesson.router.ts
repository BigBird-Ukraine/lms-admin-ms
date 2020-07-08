import { Router } from 'express';

import { lessonController } from '../../controllers';
import { isLessonValid } from '../../middleware/lesson';

const router = Router();

router.post('/', isLessonValid, lessonController.createLesson);

export const lessonRouter = router;
