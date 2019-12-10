import { Document, Model, model, Schema } from 'mongoose';

import { config } from '../../configs';
import { ICourse } from '../../Interfaces';

export type CourseType = ICourse & Document;

export let CourseSchema: Schema;

CourseSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    level: {
        type: Number
    },
    description: {
        type: String,
        required: false
    },
    modules_list: [{
        type: String
    }]
});

export const Course: Model<CourseType> = model<CourseType>(config.COURSE_COLLECTION_NAME, CourseSchema, config.COURSE_COLLECTION_NAME);
