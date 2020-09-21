import { NextFunction, Response } from 'express';
import { ObjectID } from 'mongodb';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { roomService } from '../../services';

export const isRoomPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {room_id} = req.params;

    if (!ObjectID.isValid(room_id)) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.BAD_REQUEST_WRONG_PARAMS.message,
        errors.BAD_REQUEST_WRONG_PARAMS.code
      ));
    }

    const [room] = await roomService.findRooms({_id: room_id});
    if (!room) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.NOT_FOUND_ROOM_NOT_PRESENT.message,
        errors.NOT_FOUND_ROOM_NOT_PRESENT.code));
    }

    req.room = room;

    next();
  } catch (e) {
    next(e);
  }
};
