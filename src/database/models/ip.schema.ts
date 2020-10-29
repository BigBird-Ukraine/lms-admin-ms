import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IIP } from '../../interfaces';

export type IPType = IIP & Document;

export let IPScheme: Schema;

IPScheme = new Schema({
  title: {
    type: String
  },
  fullAddress: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  ip: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

export const IP: Model<IPType> = model<IPType>
(
  DatabaseTablesEnum.IP_COLLECTION_NAME,
  IPScheme,
  DatabaseTablesEnum.IP_COLLECTION_NAME
);
