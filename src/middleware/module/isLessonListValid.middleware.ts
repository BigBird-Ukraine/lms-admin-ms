import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { lessonsListValidator } from '../../validators/module';

export const isLessonListValid = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.validate(req.body, lessonsListValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }
  next();
};
