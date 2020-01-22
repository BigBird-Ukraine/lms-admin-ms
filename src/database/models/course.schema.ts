import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { ICourse } from '../../interfaces';

export type CourseType = ICourse & Document;

export let CourseSchema: Schema;

CourseSchema = new Schema({
  label: {
    type: String,
    required: true
  },

  level: {
    type: Number,
    required: false
  },

  description: {
    type: String,
    required: false
  },
  modules_list: [{
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.MODULE_COLLECTION_NAME

  }],
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updated_at: {
    type: Date
  }
});

export const Course: Model<CourseType> = model<CourseType>(
  DatabaseTablesEnum.COURSE_COLLECTION_NAME,
  CourseSchema,
  DatabaseTablesEnum.COURSE_COLLECTION_NAME
);
