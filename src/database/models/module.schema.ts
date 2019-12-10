import { Document, Model, model, Schema } from 'mongoose';

import { config } from '../../configs';
import { IModule } from '../../Interfaces';

export type ModuleType = IModule & Document;

export let ModuleSchema: Schema;

ModuleSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: [{
        type: String
    }],
    courses: [{
        type: String,
        ref: config.COURSE_COLLECTION_NAME
    }],
    lessons: [{
        type: String
    }]
});

export const Module: Model<ModuleType> = model<ModuleType>(config.MODULE_COLLECTION_NAME, ModuleSchema, config.MODULE_COLLECTION_NAME);
