import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IPassedLesson } from '../../interfaces';

export type PassedLessonType = IPassedLesson & Document;

export let PassedLessonSchema: Schema;

PassedLessonSchema = new Schema({
  lesson_label: {
    type: String
  },
  lesson_description: {
    type: String
  },
  questions: [{
    type: Types.ObjectId,
    ref: DatabaseTablesEnum.PASSED_QUESTION_COLLECTION_NAME
  }]
});

export const PassedLesson: Model<PassedLessonType> = model<PassedLessonType>
(
  DatabaseTablesEnum.PASSED_LESSON_COLLECTION_NAME,
  PassedLessonSchema,
  DatabaseTablesEnum.PASSED_LESSON_COLLECTION_NAME
);
