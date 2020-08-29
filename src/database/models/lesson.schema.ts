import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { ILesson } from '../../interfaces';

export type LessonType = ILesson & Document;

export let LessonSchema: Schema;

LessonSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  video_path: {
    type: String,
    required: false
  },
  tags: [
    {
      type: String,
      required: false
    }
  ],
  last_valid_version: {
    type: String,
    required: false
  },
  module_id: [{
    type: Types.ObjectId,
    required: true,
    ref: DatabaseTablesEnum.MODULE_COLLECTION_NAME
  }],
  questions_id: [{
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.QUESTION_COLLECTION_NAME
  }],
  user_id: {
    type: Types.ObjectId,
    required: true,
    ref: DatabaseTablesEnum.USER_COLLECTION_NAME
  }
});

export const Lesson: Model<LessonType> = model<LessonType>
(
  DatabaseTablesEnum.LESSON_COLLECTION_NAME,
  LessonSchema,
  DatabaseTablesEnum.LESSON_COLLECTION_NAME
);
