import { Document, Model, model, Schema } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
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
        type: String,
        required: false
    }],
    courses_id: [{
        type: String,
        ref: DatabaseTablesEnum.COURSE_COLLECTION_NAME
    }],
    lessons: [{
        type: String
    }]
});

export const Module: Model<ModuleType> = model<ModuleType>
(
  DatabaseTablesEnum.MODULE_COLLECTION_NAME,
  ModuleSchema,
  DatabaseTablesEnum.MODULE_COLLECTION_NAME
);
