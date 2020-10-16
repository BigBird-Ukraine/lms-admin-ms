import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IApi } from '../../interfaces';

export type APIType = IApi & Document;

export let ApiScheme: Schema;

ApiScheme = new Schema({
  title: {
    type: String
  },
  address: {
    type: String
  },
  api: {
    type: String
  }
});

export const API: Model<APIType> = model<APIType>
(
  DatabaseTablesEnum.API_COLLECTION_NAME,
  ApiScheme,
  DatabaseTablesEnum.API_COLLECTION_NAME
);
