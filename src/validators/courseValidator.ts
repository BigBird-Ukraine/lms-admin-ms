import * as Joi from 'joi';

export const courseValidator = Joi.object().keys({
    label: Joi.string().min(4).max(255).trim().required(),
    description: Joi.string().max(255).trim(),
    modules_list: Joi.array().items(Joi.string())
});
