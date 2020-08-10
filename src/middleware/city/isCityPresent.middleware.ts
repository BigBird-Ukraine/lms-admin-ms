import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { cityService } from '../../services/city';

export const isCityPresent = async (req: Request, res: Response, next: NextFunction) => {
  const {city_id} = req.params;

  const city = cityService.getCityById(city_id);

  if (!city) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_CITY_NOT_PRESENT.message,
      errors.NOT_FOUND_CITY_NOT_PRESENT.code));
  }

  next();
};
