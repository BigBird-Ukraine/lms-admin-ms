import { NextFunction, Response } from 'express';
// import { ResponseStatusCodesEnum } from '../../constants';
// import { ErrorHandler, errors } from '../../errors';

import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services/lesson';

export const isQuestionExistInLessonMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { lesson_id } = req.params;
    const { NewQuestions_id } = req.body;
    const {questions_id} = await lessonService.getLessonsQuestionsById(lesson_id);

    for (const question of questions_id) {
      for (const newQuestion of NewQuestions_id) {

        if (question.toString() === newQuestion.toString()) {
          /*return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            `question id: ${newQuestion} already exist in lesson id: ${lesson_id}`,
            errors.BAD_REQUEST_QUESTION_ALREADY_EXIST_IN_LESSON.code)); //Commented by Viktor 08.01.20*/

          return next();
        }
      }
    }

    next();

  } catch (e) {
    next(e);
  }
};
