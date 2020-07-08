import { model } from 'mongoose';
import { DatabaseTablesEnum } from '../../constants/enums';

import { OauthToken, OauthTokenScheme, OauthTokenType } from '../../database';
import { IOauthTokenModel, IUserByToken } from '../../interfaces';

class AuthService {

    createOauthToken(createObject: IOauthTokenModel) {
        const newOauthToken = new OauthToken(createObject);

        return newOauthToken.save();
    }

    deleteOauthTokenByAccessToken(access_token: string) {
        const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

        return OauthTokenModel.deleteOne({access_token});
    }

    deleteOauthTokenByRefreshToken(refresh_token: string) {
        const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

        return OauthTokenModel.deleteOne({refresh_token});
    }

    getUserFromAccessToken(access_token: string): Promise<IUserByToken> {
        const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

        return OauthTokenModel.findOne({access_token}).populate('user_id').select({user_id: 1, _id: 0}) as any;
    }

    getUserFromRefreshToken(refresh_token: string): Promise<IUserByToken> {
        const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

        return OauthTokenModel.findOne({refresh_token}).populate('user_id').select({user_id: 1, _id: 0}) as any;
    }

    getRefreshTokenByUserId(user_id: number) {
        const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

        return OauthTokenModel.findOne({user_id}) as any;
    }
}

export const authService = new AuthService();
