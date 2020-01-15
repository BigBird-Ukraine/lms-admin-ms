import { Document, Model, model, Schema, Types } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IGroup } from '../../interfaces';

export type GroupType = IGroup & Document;

export let GroupSchema: Schema;

GroupSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        ref: DatabaseTablesEnum.COURSE_COLLECTION_NAME,
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
        type: Types.ObjectId,
        ref: DatabaseTablesEnum.USER_COLLECTION_NAME,
        required: false
    }],
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updated_at: {
        type: Date
    }
});

export const Group: Model<GroupType> = model<GroupType>
(
    DatabaseTablesEnum.GROUP_COLLECTION_NAME,
    GroupSchema,
    DatabaseTablesEnum.GROUP_COLLECTION_NAME
);
