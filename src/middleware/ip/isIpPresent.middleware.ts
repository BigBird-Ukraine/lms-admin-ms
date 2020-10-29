import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { ipService } from '../../services';

export const isIpPresent = async (req: Request, res: Response, next: NextFunction) => {
  const {ip_id} = req.query;

  const ip = await ipService.getIpById(ip_id);

  if (!ip) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_IP_NOT_PRESENT.message,
      errors.NOT_FOUND_IP_NOT_PRESENT.code));
  }

  next();
};
