import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { checkDateExist, getYesterday } from '../../helpers/room';
import { IRequestExtended, IRoom } from '../../interfaces';
import { roomService } from '../../services';

export const isRoomOccupiedMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {label, city, start_at, close_at} = req.body as IRoom;
    const yesterday = getYesterday(start_at);

    const roomByParams = {
        label,
        city,
        start_at: {
            $lte: new Date(close_at),
            $gte: yesterday
        }
    };

    const rooms = await roomService.findRooms(roomByParams) as IRoom[];
    const status = rooms.length && checkDateExist(rooms, start_at, close_at) || false;

    if (status) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_ROOM_ALREADY_EXIST.message,
            errors.BAD_REQUEST_ROOM_ALREADY_EXIST.code));
    }

    next();
};
