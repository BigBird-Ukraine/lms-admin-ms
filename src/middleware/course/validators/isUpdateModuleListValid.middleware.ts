import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { ICourseSubject } from '../../../interfaces';
import { modulesListValidator } from '../../../validators/course';

export const isUpdateModuleListValid = async (req: Request, res: Response, next: NextFunction) => {
    const modules_list = req.body as Partial<ICourseSubject>;

    const {error} = Joi.validate(modules_list, modulesListValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
