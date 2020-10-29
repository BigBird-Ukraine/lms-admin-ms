import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';

import { ErrorHandler, errors } from '../../errors';
import { IIP, IRequestExtended } from '../../interfaces';
import { ipService } from '../../services/ip';

export const isIpExist = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {ip} = req.body as IIP;

  const foundIp = await ipService.getIpByIp(ip);

  if (foundIp) {
    return next(new ErrorHandler( ResponseStatusCodesEnum.BAD_REQUEST,
      errors.BAD_REQUEST_IP_ALREADY_EXIST.message,
      errors.BAD_REQUEST_IP_ALREADY_EXIST.code));
  }

  next();
};
