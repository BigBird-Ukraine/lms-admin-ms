import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';
import { lessonValidator } from '../../validators/lesson';

export const isLessonValid = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const lessonValue = req.body;
  const {_id} = req.user as IUser;

  lessonValue.user_id = _id.toString();
  lessonValue.tags = lessonValue.tags.split(',');

  const {error} = Joi.validate(lessonValue, lessonValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
