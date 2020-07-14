import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { IQuestion } from '../../interfaces';

export type QuestionType = IQuestion & Document;

export let QuestionSchema: Schema;
QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: Types.ObjectId,
        ref: DatabaseTablesEnum.USER_COLLECTION_NAME,
        required: true
    },
    answers: [{
        value: {
            type: String,
            required: true
        },
        correct: {
            type: Boolean,
            required: true
        }
    }],
    level: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    group: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    lesson_id: [{
        type: Types.ObjectId,
        ref: DatabaseTablesEnum.LESSON_COLLECTION_NAME
    }]
});

export const Question: Model<QuestionType> = model<QuestionType>(
    DatabaseTablesEnum.QUESTION_COLLECTION_NAME,
    QuestionSchema,
    DatabaseTablesEnum.QUESTION_COLLECTION_NAME
);
