import { NextFunction, Response } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { authService } from '../../services';

export const checkRefreshTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const token = req.get('Authorization') as string;

  if (!token) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token'));
  }

  jwt.verify(token, config.JWT_REFRESH_SECRET, (err: VerifyErrors) => {
    if (err) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.FORBIDDEN, 'Bad_tokens'));
    }
  });

  const user = await authService.getUserFromRefreshToken(token);

  if (!user) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message));
  }

  req.user = user;
  req.user.refresh_token = token;

  next();

};
