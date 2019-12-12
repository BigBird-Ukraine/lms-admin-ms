import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services';
import { lessonValidator } from '../../validators';

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const lesson = req.body;

      const lessonValidity = Joi.validate(lesson, lessonValidator);

      if (lessonValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, lessonValidity.error.details[0].message));
      }

      await lessonService.createLesson(lesson);

      res.status(ResponseStatusCodesEnum.CREATED);
    } catch (e) {
      next(e);
    }
  }
}

export const lessonController = new LessonController();
