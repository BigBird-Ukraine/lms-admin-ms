import { Document, Model, model, Schema } from 'mongoose';

import { config } from '../../configs';
import { IGroup } from '../../Interfaces';

export type GroupType = IGroup & Document;

export let GroupSchema: Schema;

GroupSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        ref: config.COURSE_COLLECTION_NAME,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    started_at: {
        type: String,
        required: true
    },
    finished_at: {
        type: String,
        required: false
    },
    users_list: [{
        type: String,
        ref: config.USER_COLLECTION_NAME,
        required: false
    }],
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
});

export const Group: Model<GroupType> = model<GroupType>(config.GROUP_COLLECTION_NAME, GroupSchema, config.GROUP_COLLECTION_NAME);
