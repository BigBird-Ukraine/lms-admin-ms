import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IUser } from '../../../interfaces';
import { registerDataValidator } from '../../../validators/user';

export const isUserValid = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IUser;

    const userValidity = Joi.validate(user, registerDataValidator);

    if (userValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
    }

    next();
};
