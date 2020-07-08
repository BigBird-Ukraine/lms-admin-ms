import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IUser } from '../../../interfaces';
import { adminPatchUserValidator } from '../../../validators/user';

export const isAdminPatchUserValid = async (req: Request, res: Response, next: NextFunction) => {
    const updateInfo = req.body as IUser;

    const updateValidity = Joi.validate(updateInfo, adminPatchUserValidator);

    if (updateValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, updateValidity.error.details[0].message));
    }

    next();
};
