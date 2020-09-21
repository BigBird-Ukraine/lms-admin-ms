import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IRoom } from '../../../interfaces';
import { roomUpdatedDataValidator } from '../../../validators';

export const isRoomUpdatedDataValid = async (req: Request, res: Response, next: NextFunction) => {
  const room = req.body as Partial<IRoom>;

  const {error} = Joi.validate(room, roomUpdatedDataValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
