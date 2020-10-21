import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IRoom } from '../../../interfaces';
import { roomValidator } from '../../../validators';

export const isRoomValid = (req: Request, res: Response, next: NextFunction) => {
  const room = req.body as IRoom;

  const {error} = roomValidator.validate(room);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
