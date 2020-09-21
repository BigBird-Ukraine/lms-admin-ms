import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, ISettingRoom } from '../../interfaces';

export const isSettingDateValid = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {start_at, close_at} = req.body as ISettingRoom;
  const startTime = new Date(`2020/01/01 ${start_at.hour}:${start_at.minute}:${start_at.second}`).getTime();
  const closeTime = new Date(`2020/01/01 ${close_at.hour}:${close_at.minute}:${close_at.second}`).getTime();

  if (startTime >= closeTime) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.BAD_REQUEST,
      errors.BAD_REQUEST_INVALID_DATE.message,
      errors.BAD_REQUEST_INVALID_DATE.code));
  }

  next();
};
