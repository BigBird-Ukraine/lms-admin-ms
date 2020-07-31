import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { ILesson } from '../../interfaces';
import { lessonUpdateDataValidator } from '../../validators/lesson';

export const isLessonUpdatingDataValid = async (req: Request, res: Response, next: NextFunction) => {
    const updatingData = req.body as Partial<ILesson>;

    const {error} = Joi.validate(updatingData, lessonUpdateDataValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
