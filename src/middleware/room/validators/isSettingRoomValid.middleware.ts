import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { ISettingRoom } from '../../../interfaces';
import { settingRoomValidator } from '../../../validators';

export const isSettingRoomValid = (req: Request, res: Response, next: NextFunction) => {
  const room = req.body as ISettingRoom;

  const {error} = settingRoomValidator.validate(room);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
