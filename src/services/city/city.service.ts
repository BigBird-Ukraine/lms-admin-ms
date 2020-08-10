import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { City, CityScheme, CityType } from '../../database/models';
import { ICityModel } from '../../interfaces';

class CityService {
  createCity(city: ICityModel): Promise<void> {
    const newCity = new City(city);

    return newCity.save() as any;
  }

  getCityById(id: string): Promise<any> {
    const CityModel = model<CityType>(DatabaseTablesEnum.CITY_COLLECTION_NAME, CityScheme);

    return CityModel.findById(id) as any;
  }

  getCities(): Promise<any> {
    const CityModel = model<CityType>(DatabaseTablesEnum.CITY_COLLECTION_NAME, CityScheme);

    return CityModel.find() as any;
  }

  deleteCity(city_id: string): Promise<void> {
    const CityModel = model<CityType>(DatabaseTablesEnum.CITY_COLLECTION_NAME, CityScheme);

    return CityModel.findByIdAndDelete(city_id) as any;
  }
}

export const cityService = new CityService();
