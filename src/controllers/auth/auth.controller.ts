import { NextFunction, Response } from 'express';

import { HardWordsEnum, UserActionEnum } from '../../constants';
import { tokenizer } from '../../helpers';
import { IRequestExtended } from '../../interfaces';
import { authService } from '../../services';

class AuthController {

    // todo needs transaction here to instead token pair into DB
    async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {

        const {_id} = req.user;

        const {accessToken, refreshToken} = tokenizer(UserActionEnum.AUTH);

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
    }

    async logoutUser(req: IRequestExtended, res: Response, next: NextFunction) {

        const access_token = req.get(HardWordsEnum.AUTHORIZATION) as string;

        await authService.deleteOauthTokenByAccessToken(access_token);

        res.end();
    }

    async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {

        const {refresh_token, user_id} = req.user;

        const {accessToken, refreshToken} = tokenizer(UserActionEnum.AUTH);

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
    }
}

export const authController = new AuthController();
