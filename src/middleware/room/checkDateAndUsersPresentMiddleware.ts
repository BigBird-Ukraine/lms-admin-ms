import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom } from '../../interfaces';

export const checkDateAndUsersPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const lastVersionRoom = req.room as IRoom;
  const {start_at} = req.body as Partial<IRoom>;

  const lastDate = lastVersionRoom.start_at;

  if (lastDate !== start_at && lastVersionRoom.booked_users.length) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.FORBIDDEN,
      errors.FORBIDDEN_ROOM_HAS_USERS.message,
      errors.FORBIDDEN_ROOM_HAS_USERS.code));
  }

  next();
};
