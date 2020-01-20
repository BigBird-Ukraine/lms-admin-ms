import * as Joi from 'joi';
import { moduleValidator } from '../module';

export const modulesListValidator = Joi.object().keys({
    modules_list: Joi.array().items(moduleValidator)
});
