import { NextFunction, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { authService } from '../../services';
import { IRequestExtended } from '../../Interfaces';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {

    try {
        const authToken = req.get('Authorization') as string;

        if (!authToken) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token'));
        }

        verify(authToken, config.JWT_SECRET, (err: VerifyErrors) => {
            if (err) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Invalid token'));
            }
        });

        const user = await authService.getUserFromAccessToken(authToken); // todo think how create with IUser

        if (!user) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message));
        }

        req.user = user;

        next();

    } catch (e) {
        next(e);
    }
};
