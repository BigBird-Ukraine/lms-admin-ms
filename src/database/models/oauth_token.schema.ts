import { Document, Model, model, Schema, Types } from 'mongoose';

import { config } from '../../configs';
import { IOauthTokenModel } from '../../Interfaces';

export type OauthTokenType = IOauthTokenModel & Document;

export let OauthTokenScheme: Schema;

OauthTokenScheme = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: config.USER_COLLECTION_NAME,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
});

export const OauthToken: Model<OauthTokenType> = model<OauthTokenType>(
    config.OAUTH_TOKEN_COLLECTION_NAME,
    OauthTokenScheme,
    config.OAUTH_TOKEN_COLLECTION_NAME
);
