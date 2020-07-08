import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { groupValidator } from '../../../validators';

export const isGroupValid = async (req: Request, res: Response, next: NextFunction) => {
    const group = req.body;
    const groupValidity = Joi.validate(group, groupValidator);

    if (groupValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }

    next();
};
