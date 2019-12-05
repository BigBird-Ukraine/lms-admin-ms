import { Document, Model, model, Schema, Types } from 'mongoose';

import { config } from '../../configs';
import { UserRoleEnum, UserStatusEnum } from '../../constants';
import { IUser } from '../../Interfaces';

export type UserType = IUser & Document;

export let UserSchema: Schema;

UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: UserStatusEnum.ACTIVE
    },
    role: {
        type: Number,
        required: true,
        default: UserRoleEnum.STUDENT
    },
    photo_path: String,
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date
    },
    group_id: {
        type: Types.ObjectId,
        ref: config.GROUP_COLLECTION_NAME
    },
    passed_test_id: [{
        type: Types.ObjectId
    }]

});

export const User: Model<UserType> = model<UserType>(config.USER_COLLECTION_NAME, UserSchema, config.USER_COLLECTION_NAME);
