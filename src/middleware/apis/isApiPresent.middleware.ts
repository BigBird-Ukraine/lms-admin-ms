import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { apiService } from '../../services';

export const isApiPresent = async (req: Request, res: Response, next: NextFunction) => {
  const {api_id} = req.query;

  const api = await apiService.getApiById(api_id);

  if (!api) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_API_NOT_PRESENT.message,
      errors.NOT_FOUND_API_NOT_PRESENT.code));
  }

  next();
};
