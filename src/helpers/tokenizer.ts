import * as jwt from 'jsonwebtoken';

import { config } from '../configs';
import { ResponseStatusCodesEnum, UserActionEnum } from '../constants';
import { ErrorHandler } from '../errors';

export const tokenizer = (method: number): any => {

  switch (method) {
      case UserActionEnum.AUTH:
          const accessToken = jwt.sign({}, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
          const refreshToken = jwt.sign({}, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFETIME });

          return { accessToken, refreshToken };
      default:
          throw new ErrorHandler(ResponseStatusCodesEnum.SERVER_ERROR, 'Wrong action type');
  }
};
