import * as Joi from 'joi';

export const groupValidator = Joi.object().keys({
    label: Joi.string().min(4).max(255).trim().required(),
});
