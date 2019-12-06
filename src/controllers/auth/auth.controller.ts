import { NextFunction, Response } from 'express';

import { UserActionEnum } from '../../constants';
import { tokenizer } from '../../helpers';
import { authService } from '../../services';
import { IRequestExtended } from '../../Interfaces';

class AuthController {

    // todo needs transaction here to inster token pair into DB
    async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;

            const { accessToken, refreshToken } = tokenizer(UserActionEnum.AUTH);

            await authService.createOauthToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                user_id: _id
            });

            res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (e) {
            next(e);
        }
    }

    async logoutUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const access_token = req.get('Authorization') as string;

            await authService.deleteOauthTokenByAccessToken(access_token);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {

            const { refresh_token , user_id } = req.user;

            const { accessToken, refreshToken } = tokenizer(UserActionEnum.AUTH);

            await authService.deleteOauthTokenByRefreshToken(refresh_token);

            await authService.createOauthToken({
                access_token: accessToken,
                refresh_token: refreshToken,
                user_id
            });

            res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
