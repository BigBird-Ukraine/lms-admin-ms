import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { ICourseSubject } from '../../../interfaces';
import { courseValidator } from '../../../validators/course';

export const isUpdateCourseValid = async (req: Request, res: Response, next: NextFunction) => {
    const course = req.body as ICourseSubject;
    const {error} = Joi.validate(course, courseValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
