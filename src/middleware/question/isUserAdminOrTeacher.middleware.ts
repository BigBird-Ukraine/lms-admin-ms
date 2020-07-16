import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserRoleEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';

export const isUserAdminOrTeacherMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {role_id} = req.user as IUser;

  if (role_id !== UserRoleEnum.ADMIN && role_id !== UserRoleEnum.TEACHER) {
    return next(
      new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        'No permission to action'
      )
    );
  }

  next();
};
