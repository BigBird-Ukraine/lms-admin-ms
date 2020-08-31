import { Document, model, Model, Schema, Types } from 'mongoose';
import { DatabaseTablesEnum } from '../../constants/enums';
import { IComment } from '../../interfaces';

export type CommentType = IComment & Document;

export let CommentSchema: Schema;

CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: Types.ObjectId,
    required: true,
    ref: DatabaseTablesEnum.USER_COLLECTION_NAME
  },
  lesson_id: {
    type: Types.ObjectId,
    required: true,
    ref: DatabaseTablesEnum.LESSON_COLLECTION_NAME
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

export const Comment: Model<CommentType> = model<CommentType>
(
  DatabaseTablesEnum.COMMENT_COLLECTION_NAME,
  CommentSchema,
  DatabaseTablesEnum.COMMENT_COLLECTION_NAME
);
