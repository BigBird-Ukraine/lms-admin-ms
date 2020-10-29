import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { IIP } from '../../interfaces';
import { ipService } from '../../services';

export class IpController {
  async createIp(req: Request, res: Response, next: NextFunction) {
    await ipService.createIp(req.body as IIP);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getIp(req: Request, res: Response, next: NextFunction) {
    const apis = await ipService.getIps();

    res.json(apis);
  }

  async deleteIp(req: Request, res: Response, next: NextFunction) {
    const {ip_id} = req.query;

    await ipService.deleteIp(ip_id);

    res.json(`Ip ${ip_id} has been deleted`);
  }
}

export const ipController = new IpController();
