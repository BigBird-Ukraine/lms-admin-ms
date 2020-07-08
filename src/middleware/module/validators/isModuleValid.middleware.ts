import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { moduleValidator } from '../../../validators/module';

export const isModuleValid = async (req: Request, res: Response, next: NextFunction) => {
    const module = req.body;
    const moduleValidity = Joi.validate(module, moduleValidator);

    if (moduleValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, moduleValidity.error.details[0].message));
    }

    next();
};
