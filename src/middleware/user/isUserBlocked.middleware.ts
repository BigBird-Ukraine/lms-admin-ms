import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';

export const isUserBlocked = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { status_id } = req.user as IUser;

    if (status_id === UserStatusEnum.BLOCKED) {
      next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        'Tou van work just with active user'
      ));
    }
    next();
  } catch (e) {
    next(e);
  }
};
