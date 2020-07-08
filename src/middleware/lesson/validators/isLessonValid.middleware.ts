import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { lessonValidator } from '../../../validators';

export const isLessonValid = async (req: Request, res: Response, next: NextFunction) => {
    const lesson = req.body;

    const lessonValidity = Joi.validate(lesson, lessonValidator);

    if (lessonValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, lessonValidity.error.details[0].message));
    }

    next();
};
