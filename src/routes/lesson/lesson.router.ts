import { Router } from 'express';

import { lessonController, userController } from '../../controllers';
import {
  checkPassedTestData, checkQuestionsListLenght, isLessonFilterValid, isLessonPassedTestDataValid,
  isLessonPresentMiddleware, isLessonQuestionValid, isLessonUpdatingDataValid, isQuestionExistInLessonMiddleware
} from '../../middleware/lesson';

import { checkAccessTokenMiddleware } from '../../middleware/auth';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.post('/', lessonController.createLesson);
router.get('/my', lessonController.getMyLesson);

router.get('/', isLessonFilterValid, lessonController.getLessons);

router.use('/:lesson_id', isLessonPresentMiddleware);
router.get('/:lesson_id', lessonController.getLessonById);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', isLessonPassedTestDataValid, checkPassedTestData, userController.addTestResult);

router.patch('/:lesson_id', isLessonUpdatingDataValid, lessonController.updateMyLesson);
router.patch('/:lesson_id/question', isLessonQuestionValid, checkQuestionsListLenght, isQuestionExistInLessonMiddleware,
  lessonController.addQuestionToLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
