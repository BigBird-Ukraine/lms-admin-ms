import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IGroup } from '../../../interfaces';
import { groupUpdateValidator } from '../../../validators';

export const isUpdatedGroupValid = async (req: Request, res: Response, next: NextFunction) => {
    const list = req.body as Partial<IGroup>;

    const groupValidity = Joi.validate(list, groupUpdateValidator);

    if (groupValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }

    next();
};
