import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { IApi } from '../../interfaces';
import { apiService } from '../../services';

export class ApiController {
  async createApi(req: Request, res: Response, next: NextFunction) {
    await apiService.createApi(req.body as IApi);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getApis(req: Request, res: Response, next: NextFunction) {
    const apis = await apiService.getApis();

    res.json(apis);
  }

  async deleteApi(req: Request, res: Response, next: NextFunction) {
    const {api_id} = req.query;

    await apiService.deleteApi(api_id);

    res.json(`Api ${api_id} has been deleted`);
  }
}

export const apiController = new ApiController();
