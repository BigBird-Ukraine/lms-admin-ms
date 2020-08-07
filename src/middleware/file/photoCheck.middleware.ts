import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';

export const photoCheckMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    req.photos = [];

    if (!req.files) {
      return next();
    }

    let {files} = req.files;

    if (!Array.isArray(files)) {
      files = [files];
    }

    for (const file of files) {
      const {mimetype, size, name} = file as UploadedFile;

      if (config.PHOTO_MIMETYPES.includes(mimetype)) {

        if (config.MAX_PHOTO_SIZE < size) {
          return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_MAX_PHOTO_SIZE.message,
            errors.BAD_REQUEST_MAX_PHOTO_SIZE.code
          ));
        }
        req.photos.push(file);

      } else {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          `File ${name} is not valid`,
          errors.BAD_REQUEST_INVALID_FILE_MIMETYPE.code
        ));
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};
