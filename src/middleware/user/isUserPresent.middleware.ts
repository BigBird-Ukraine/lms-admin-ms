import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { userService } from '../../services';

export const isUserPresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;
        const user = await userService.getByID( user_id );

        if (!user) {
            next(new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER_NOT_PRESENT.message,
                errors.NOT_FOUND_USER_NOT_PRESENT.code
            ));
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
