import { Document, model, Model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { ISettingRoom } from '../../interfaces';

export type SettingRoomType = ISettingRoom & Document;

export let SettingRoomScheme: Schema;

SettingRoomScheme = new Schema({
  label: {
    type: String,
    required: true
  },
  start_at: {
    type: Object,
    required: true
  },
  close_at: {
    type: Object,
    required: true
  },
  count_places: {
    type: Number,
    required: true
  },
  period_time_to_sign_up: {
    type: Number,
    required: true
  },
  cities: [{
    type: String,
    required: true
  }]
});

export const SettingRoom: Model<SettingRoomType> = model<SettingRoomType>
(
  DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME,
  SettingRoomScheme,
  DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME
);
