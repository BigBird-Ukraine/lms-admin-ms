import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';

import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, ISettingRoom } from '../../interfaces';
import { roomService } from '../../services/room';

export const isSettingRoomExist = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {label, cities} = req.body as ISettingRoom;
  const filterParams = {
    label,
    cities: {$in: [...cities]}
  };

  const settingRooms = await roomService.findSettingRooms(filterParams);

  if (settingRooms.length) {
    return next(new ErrorHandler( ResponseStatusCodesEnum.BAD_REQUEST,
      errors.BAD_REQUEST_ROOM_ALREADY_EXIST.message,
      errors.BAD_REQUEST_ROOM_ALREADY_EXIST.code));
  }

  next();
};
