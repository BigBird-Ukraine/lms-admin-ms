import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { courseService } from '../../services';

export const isCoursePresent = async (req: Request, res: Response, next: NextFunction) => {
    const {course_id} = req.params;

    if (!course_id) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_WRONG_PARAMS.message,
            errors.BAD_REQUEST_WRONG_PARAMS.code
        ));
    }

    const course = await courseService.getCourseByID(course_id);

    if (!course) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.NOT_FOUND,
            errors.NOT_FOUND_COURSE_NOT_PRESENT.message,
            errors.NOT_FOUND_COURSE_NOT_PRESENT.code
        ));
    }

    next();
};
