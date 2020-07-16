import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { addQuestionToLessonValidator } from '../../validators/lesson';

export const isLessonQuestionValid = async (req: Request, res: Response, next: NextFunction) => {
    const {NewQuestions_id} = req.body;

    const {error} = Joi.validate(NewQuestions_id, addQuestionToLessonValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
