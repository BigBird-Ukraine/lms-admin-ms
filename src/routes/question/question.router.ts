import { Router } from 'express';

import { questionController } from '../../controllers';

import {
  checkAccessTokenMiddleware, checkIsAdmin, isQuestionFilterValid,
  isQuestionPresentMiddleware, isQuestionValid,
  isUserAdminOrTeacherMiddleware
} from '../../middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isQuestionFilterValid, questionController.getQuestions);

router.use(checkIsAdmin);
router.get('/my', questionController.getMyQuestions);
router.post('/', isQuestionValid, isUserAdminOrTeacherMiddleware, questionController.createQuestion);

router.use('/:question_id', isQuestionPresentMiddleware);
router.delete('/:question_id', questionController.deleteQuestion);

export const questionRouter = router;
