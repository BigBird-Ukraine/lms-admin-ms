import { Router } from 'express';

import { lessonController, userController } from '../../controllers';
import { checkAccessTokenMiddleware } from '../../middleware/auth';
import {
  checkPassedTestData,
  checkQuestionsListLenght,
  isCommentPresent,
  isLessonCommentariesDataValid,
  isLessonFilterValid,
  isLessonPassedTestDataValid,
  isLessonPresentMiddleware,
  isLessonQuestionValid,
  isLessonUpdatingDataValid,
  isQuestionExistInLessonMiddleware
} from '../../middleware/lesson';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.post('/', lessonController.createLesson);
router.get('/my', lessonController.getMyLesson);

router.get('/', isLessonFilterValid, lessonController.getLessons);
router.get('/labels', lessonController.getLessonsLabel);
router.get('/statics', lessonController.getStatics);
router.get('/by_module', lessonController.getLessonsByModule);

router.delete('/comment', isCommentPresent, lessonController.deleteComment);
router.put('/comment', isLessonCommentariesDataValid, isCommentPresent, lessonController.editComment);

router.use('/:lesson_id', isLessonPresentMiddleware);
router.get('/:lesson_id', lessonController.getLessonById);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', isLessonPassedTestDataValid, checkPassedTestData, userController.getResultPassedTest);

router.post('/:lesson_id/comment', isLessonCommentariesDataValid, lessonController.saveComment);
router.get('/:lesson_id/comment', lessonController.getCommentaries);

router.patch('/:lesson_id', isLessonUpdatingDataValid, lessonController.updateMyLesson);
router.patch('/:lesson_id/question', isLessonQuestionValid, checkQuestionsListLenght, isQuestionExistInLessonMiddleware,
  lessonController.addQuestionToLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
