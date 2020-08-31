import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { commentService } from '../../services';

export const isCommentPresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {comment_id} = req.query;

    const comments = await commentService.getCommentById(comment_id);

    if (!comments) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        errors.NOT_FOUND_COMMENT_NOT_PRESENT.message,
        errors.NOT_FOUND_COMMENT_NOT_PRESENT.code));
    }

    next();
  } catch (e) {
    next(e);
  }
};
