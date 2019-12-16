import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { userService } from '../../services/user';

export const isUserPresent = async (req: Request, res: Response, next: NextFunction) => {
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
        next();
    } catch (e) {
        next(e);
    }
};
