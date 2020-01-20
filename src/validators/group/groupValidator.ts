import * as Joi from 'joi';

export const groupValidator = Joi.object().keys({
    label: Joi.string().min(4).max(255).trim().required(),
    course_id: Joi.string().max(255).trim(),
    city: Joi.string().max(100),
    started_at: Joi.string().trim().required(),
    finished_at: Joi.string().trim(),
    users_list: Joi.array().items(Joi.string().max(255)),
    created_at: Joi.string().trim(),
    updated_at: Joi.string().trim()
});
