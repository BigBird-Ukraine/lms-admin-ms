import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserRoleEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IUser } from '../../Interfaces';

export const checkIsAdmin = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;
        if (user.role_id !== UserRoleEnum.ADMIN) {
            return next(
                new ErrorHandler(
                    ResponseStatusCodesEnum.FORBIDDEN,
                    errors.UNAUTHORIZED_WRONG_CREDENTIALS.message,
                    errors.UNAUTHORIZED_WRONG_CREDENTIALS.code
                ));
        }
        next();
    } catch (e) {
        next(e);
    }
};
