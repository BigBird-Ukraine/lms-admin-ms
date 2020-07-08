import { NextFunction, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

import { config } from '../../configs';
import { HardWordsEnum, ResponseStatusCodesEnum, StatusesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';
import { authService } from '../../services/auth';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const authToken = req.get(HardWordsEnum.AUTHORIZATION) as string;

  if (!authToken) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.NO_TOKEN));
  }

  verify(authToken, config.JWT_SECRET, (err: VerifyErrors) => {
    if (err) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, StatusesEnum.INVALID_TOKEN));
    }
  });

  const user = await authService.getUserFromAccessToken(authToken); // todo think how create with IUser

  if (!user || !user.user_id) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message));
  }

  req.user = user.user_id as IUser;

  next();
};
