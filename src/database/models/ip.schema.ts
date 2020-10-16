import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IIP } from '../../interfaces';

export type IPType = IIP & Document;

export let IPScheme: Schema;

IPScheme = new Schema({
  title: {
    type: String
  },
  address: {
    type: String
  },
  ip: {
    type: String
  }
});

export const IP: Model<IPType> = model<IPType>
(
  DatabaseTablesEnum.IP_COLLECTION_NAME,
  IPScheme,
  DatabaseTablesEnum.IP_COLLECTION_NAME
);
