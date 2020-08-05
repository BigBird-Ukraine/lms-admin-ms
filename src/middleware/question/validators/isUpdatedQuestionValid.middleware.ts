import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { inseredUpdatedQuestionValidator } from '../../../validators';

export const isUpdatedQuestionValid = async (req: Request, res: Response, next: NextFunction) => {
    const questionValue = req.body;

    const {error} = Joi.validate(questionValue, inseredUpdatedQuestionValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
