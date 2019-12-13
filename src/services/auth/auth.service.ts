import { model } from 'mongoose';

import { OauthToken, OauthTokenScheme, OauthTokenType } from '../../database';
import { IOauthTokenModel, IUserByToken } from '../../Interfaces';

class AuthService {

    createOauthToken(createObject: IOauthTokenModel) {
        const newOauthToken = new OauthToken(createObject);
        return newOauthToken.save();
    }

    deleteOauthTokenByAccessToken(access_token: string) {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.deleteOne({ access_token });
    }

    deleteOauthTokenByRefreshToken(refresh_token: string) {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.deleteOne({ refresh_token });
    }

    async getUserFromAccessToken(access_token: string): Promise<IUserByToken> {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.findOne({ access_token }).populate('user_id').select({ user_id: 1, _id: 0 }) as any;
    }

    async getUserFromRefreshToken(refresh_token: string): Promise<IUserByToken> {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.findOne({ refresh_token }).populate('user_id').select({ user_id: 1, _id: 0 }) as any;
    }
}

export const authService = new AuthService();
