import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { userFilterValidator } from '../../../validators';

export const isUserFilterValid = async (req: Request, res: Response, next: NextFunction) => {
    const filterParams = req.query;

    const filterValidity = Joi.validate(filterParams, userFilterValidator);

    if (filterValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    next();
};
