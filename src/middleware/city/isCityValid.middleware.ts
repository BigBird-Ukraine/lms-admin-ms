import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { ICityModel } from '../../interfaces';
import { cityValidator } from '../../validators/city';

export const isCityValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const city: ICityModel = req.body;

  const {error} = Joi.validate(city, cityValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
