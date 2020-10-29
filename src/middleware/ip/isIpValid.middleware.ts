import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IIP } from '../../interfaces';
import { ipValidator } from '../../validators';

export const isIpValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.body as IIP;

  const {error} = ipValidator.validate(ip);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
