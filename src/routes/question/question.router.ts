import { Router } from 'express';

import { questionController } from '../../controllers';
import {
  checkAccessTokenMiddleware, checkIsAdmin, isQuestionFilterValid,
  isQuestionPresentMiddleware, isQuestionValid,
  isUserAdminMiddleware, isUserQuestionOwnerMiddleware
} from '../../middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isQuestionFilterValid, questionController.getQuestions);

router.use(checkIsAdmin);
router.get('/my', questionController.getMyQuestions);
router.post('/', isQuestionValid, isUserAdminMiddleware, questionController.createQuestion);

router.use('/:question_id', isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware);
router.delete('/:question_id', questionController.deleteQuestion);

export const questionRouter = router;
