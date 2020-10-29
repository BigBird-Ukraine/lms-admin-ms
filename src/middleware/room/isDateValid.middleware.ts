import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';

import { RegExpEnum, ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRoom } from '../../interfaces';

export const isDateValid = (req: Request, res: Response, next: NextFunction) => {
    const {start_at, close_at} = req.body as IRoom;

    const startAt = new Date(start_at).getTime();
    const closeAt = new Date(close_at).getTime();
    const currentAt = new Date(moment().format(RegExpEnum.date_format)).getTime();

    if (currentAt > startAt || closeAt <= startAt) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_INVALID_DATE.message,
            errors.BAD_REQUEST_INVALID_DATE.code));
    }

    next();
};
