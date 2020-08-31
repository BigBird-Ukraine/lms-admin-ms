import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Comment, CommentSchema, CommentType } from '../../database/models';
import { IComment } from '../../interfaces';

class CommentService {
  saveComment(comment: IComment): Promise<any> {
    const newComment = new Comment(comment);

    return newComment.save() as any;
  }

  getCommentaries(lesson_id: string, limit: number, skip: number) {
    const CommentModel = model<CommentType>(DatabaseTablesEnum.COMMENT_COLLECTION_NAME, CommentSchema);

    return CommentModel
      .find({lesson_id})
      .select({lesson_id: 0, __v: 0})
      .populate({
        path: 'user_id',
        select: {name: 1, surname: 1}
      })
      .limit(limit)
      .skip(skip)
      .sort({created_at: 'desc'}) as any;
  }

  getSizeOfAll(filterParams: Partial<IComment>): Promise<number> {
    const CommentModel = model<CommentType>(DatabaseTablesEnum.COMMENT_COLLECTION_NAME, CommentSchema);

    return CommentModel
      .countDocuments(filterParams) as any;
  }

  getCommentById(comment_id: string): Promise<IComment> {
    const CommentModel = model<CommentType>(DatabaseTablesEnum.COMMENT_COLLECTION_NAME, CommentSchema);

    return CommentModel.findById(comment_id) as any;
  }

  delete(comment_id: string): Promise<void> {
    const CommentModel = model<CommentType>(DatabaseTablesEnum.COMMENT_COLLECTION_NAME, CommentSchema);

    return CommentModel.findByIdAndDelete(comment_id) as any;
  }

  editComment(comment_id: string, text: string): Promise<void> {
    const CommentModel = model<CommentType>(DatabaseTablesEnum.COMMENT_COLLECTION_NAME, CommentSchema);

    return CommentModel.findByIdAndUpdate(comment_id, {text}) as any;
  }
}

export const commentService = new CommentService();
