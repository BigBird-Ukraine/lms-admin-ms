import { NextFunction, Response } from 'express';
import { ObjectID } from 'mongodb';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { roomService } from '../../services';

export const isSettingRoomPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;

    if (!ObjectID.isValid(id)) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.BAD_REQUEST_WRONG_PARAMS.message,
        errors.BAD_REQUEST_WRONG_PARAMS.code
      ));
    }

    const [room] = await roomService.findSettingRooms({_id: id});

    if (!room) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.NOT_FOUND_SETTING_ROOM_NOT_PRESENT.message,
        errors.NOT_FOUND_SETTING_ROOM_NOT_PRESENT.code));
    }

    next();
  } catch (e) {
    next(e);
  }
};
