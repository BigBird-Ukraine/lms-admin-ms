import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { insertedQuestionValidator } from '../../../validators';

export const isQuestionValid = async (req: Request, res: Response, next: NextFunction) => {
    const questionValue = req.body;

    const {error} = Joi.validate(questionValue, insertedQuestionValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
