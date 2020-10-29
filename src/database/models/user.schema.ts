import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum, UserRoleEnum, UserStatusEnum } from '../../constants';
import { IUser } from '../../interfaces';

export type UserType = IUser & Document;

export let UserSchema: Schema;

UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  phone_number: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status_id: {
    type: Number,
    required: true,
    default: UserStatusEnum.ACTIVE
  },
  role_id: {
    type: Number,
    required: true,
    default: UserRoleEnum.STUDENT
  },
  population_point: {
    type: String,
    required: true
  },
  passed_tests: [{
    passed_lesson_id: {
      type: Types.ObjectId,
      required: false,
      ref: DatabaseTablesEnum.PASSED_LESSON_COLLECTION_NAME
    },
    passed_questions_id: [{
      type: Types.ObjectId,
      required: false,
      ref: DatabaseTablesEnum.PASSED_QUESTION_COLLECTION_NAME
    }],
    max_mark: {
      type: Number,
      required: true
    },
    result: {
      type: Number,
      required: true
    },
    passed_at: {
      type: Date,
      default: Date.now(),
      required: true
    }
  }],
  photo_path: String,
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date
  },
  groups_id: [{
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.GROUP_COLLECTION_NAME
  }],
  booking_ban_status: {
    status: {
      type: Number,
      required: true,
      default: UserStatusEnum.ACTIVE
    },
    date: Date
  },
  new_password: {
    type: String,
    required: false
  },
  confirm_token: {
    type: String,
    required: false
  },
  reset_token: {
    type: String,
    required: false
  },
  change_token: {
    type: String,
    required: false
  }
});

export const User: Model<UserType> = model<UserType>(
  DatabaseTablesEnum.USER_COLLECTION_NAME,
  UserSchema,
  DatabaseTablesEnum.USER_COLLECTION_NAME
);
