import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IQuestion, IRequestExtended, IUser } from '../../interfaces';

export const isUserQuestionOwnerMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user as IUser;
    const { user_id } = req.question as IQuestion;

    if (user_id.toString() !== _id.toString()) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_NOT_YOUR_QUESTION.message,
        errors.FORBIDDEN_NOT_YOUR_QUESTION.code));
    }

    next();
  } catch (e) {
    return next(e);
  }
};
