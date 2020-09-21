import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { ISettingRoom } from '../../../interfaces';
import { settingRoomValidator } from '../../../validators';

export const isSettingRoomValid = async (req: Request, res: Response, next: NextFunction) => {
  const room = req.body as ISettingRoom;

  const {error} = Joi.validate(room, settingRoomValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
