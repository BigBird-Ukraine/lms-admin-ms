import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { ICityModel } from '../../interfaces';

export type CityType = ICityModel & Document;

export let CityScheme: Schema;

CityScheme = new Schema({
  title: {
    type: String
  },
  country: {
    type: String
  }
});

export const City: Model<CityType> = model<CityType>
(
  DatabaseTablesEnum.CITY_COLLECTION_NAME,
  CityScheme,
  DatabaseTablesEnum.CITY_COLLECTION_NAME
);
