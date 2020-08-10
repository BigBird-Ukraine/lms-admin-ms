import { NextFunction, Request,  Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { cityService } from '../../services/city';

export class CityController {
  async createCity(req: Request, res: Response, next: NextFunction) {
    await cityService.createCity(req.body);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getCities(req: Request, res: Response, next: NextFunction) {
    const cities = await cityService.getCities();

    res.json(cities);
  }

  async deleteCity(req: Request, res: Response, next: NextFunction) {
    const {city_id} = req.query;

    await cityService.deleteCity(city_id);

    res.json(`city ${city_id} has been deleted`);
  }
}

export const cityController = new CityController();
