import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';

import { ErrorHandler, errors } from '../../errors';
import { IApi, IRequestExtended } from '../../interfaces';
import { apiService } from '../../services/apis';

export const isApiExist = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {api} = req.body as IApi;

  const foundApi = await apiService.getApiByApi(api);

  if (foundApi) {
    return next(new ErrorHandler( ResponseStatusCodesEnum.BAD_REQUEST,
      errors.BAD_REQUEST_API_ALREADY_EXIST.message,
      errors.BAD_REQUEST_API_ALREADY_EXIST.code));
  }

  next();
};
