import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { groupFilterValidator } from '../../../validators/group';

export const isGroupFilterValid = async (req: Request, res: Response, next: NextFunction) => {
    const {filterParams} = req.query;
    const {error} = Joi.validate(filterParams, groupFilterValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
