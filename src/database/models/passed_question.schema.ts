import { Document, Model, model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IPassedQuestion } from '../../interfaces';

export type PassedQuestionType = IPassedQuestion & Document;

export let PassedQuestionSchema: Schema;

PassedQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: false
  },
  subject: {
    type: String,
    required: true
  }
});

export const PassedQuestion: Model<PassedQuestionType> = model<PassedQuestionType>
(
  DatabaseTablesEnum.PASSED_QUESTION_COLLECTION_NAME,
  PassedQuestionSchema,
  DatabaseTablesEnum.PASSED_QUESTION_COLLECTION_NAME
);
