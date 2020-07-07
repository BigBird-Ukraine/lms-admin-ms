import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { filterParametresValidator } from '../../../validators/course';

export const isCourseFilterValid = async (req: Request, res: Response, next: NextFunction) => {
    const {filterParams} = req.query;
    const {error} = Joi.validate(filterParams, filterParametresValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
