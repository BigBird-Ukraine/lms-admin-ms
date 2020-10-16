import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IApi } from '../../interfaces';
import { apiValidator } from '../../validators';

export const isApiValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const api = req.body as IApi;

  const {error} = Joi.validate(api, apiValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
