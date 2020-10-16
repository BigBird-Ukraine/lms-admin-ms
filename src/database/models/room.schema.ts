import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IRoom } from '../../interfaces';

export type RoomType = IRoom & Document;

export let RoomSchema: Schema;

RoomSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  count_all_places: {
    type: Number,
    required: true
  },
  free_places: {
    type: Number
  },
  start_at: {
    type: Date,
    required: true
  },
  close_at: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  groups: [{
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.GROUP_COLLECTION_NAME
  }],
  booked_users: [{
    user_id: {
      type: Types.ObjectId,
      ref: DatabaseTablesEnum.USER_COLLECTION_NAME
    },
    table_number: Number,
    rent_start: Date,
    rent_end: Date,
    confirm_status: {
      type: Number,
      default: 0
    }
  }],
  address: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  ip: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  },
  owner_id: {
    type: Types.ObjectId,
    required: true,
    ref: DatabaseTablesEnum.USER_COLLECTION_NAME
  }
});

export const Room: Model<RoomType> = model<RoomType>
(
  DatabaseTablesEnum.ROOM_COLLECTION_NAME,
  RoomSchema,
  DatabaseTablesEnum.ROOM_COLLECTION_NAME
);
