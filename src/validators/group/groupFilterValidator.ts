import * as Joi from 'joi';

export const groupFilterValidator = Joi.object().keys({
    label: Joi.string().min(1).max(255).trim(),
    city: Joi.string().min(1).max(100).trim(),
    course_id: Joi.object().keys({
        label: Joi.string().max(255).trim()
    })
});
