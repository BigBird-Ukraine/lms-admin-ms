import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { groupAttendanceValidator } from '../../validators/group';

export const isGroupAttendanceValid = async (req: Request, res: Response, next: NextFunction) => {
    const visit_log = req.body;
    const {error} = Joi.validate(visit_log, groupAttendanceValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
