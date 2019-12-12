import { Router } from 'express';

import { lessonController } from '../../controllers';

const router = Router();

router.post('/', lessonController.createLesson);

export const lessonRouter = router;
