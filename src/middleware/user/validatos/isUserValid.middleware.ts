import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IUser } from '../../../interfaces';
import { registerDataValidator } from '../../../validators';

export const isUserValid = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IUser;
    const {error} = Joi.validate(user, registerDataValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
