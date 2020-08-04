import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';

import { IRequestExtended } from '../../interfaces';

export const checkNumberOfUserPhoto = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const photos = req.photos as UploadedFile[];

    if (photos.length > 1) {
      return next (new ErrorHandler(
        ResponseStatusCodesEnum.BAD_REQUEST,
        errors.BAD_REQUEST_MAX_PHOTO_AMOUNT.message,
        errors.BAD_REQUEST_MAX_PHOTO_AMOUNT.code));
    }

    next();

  } catch (e) {
    next(e);
  }
};
