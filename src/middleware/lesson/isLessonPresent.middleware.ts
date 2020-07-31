import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services';

export const isLessonPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { lesson_id } = req.params;

    const lesson = await lessonService.getLessonByID(lesson_id);

    if (!lesson) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.NOT_FOUND_LESSON_NOT_PRESENT.message,
        errors.NOT_FOUND_LESSON_NOT_PRESENT.code));
    }

    req.lesson = lesson;

    next();

  } catch (e) {
    next(e);
  }
};
