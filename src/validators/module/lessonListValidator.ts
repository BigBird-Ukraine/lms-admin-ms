import * as Joi from 'joi';

export const lessonsListValidator = Joi.object().keys({
  lessons_list: Joi.array().items(Joi.string().min(1).max(255).trim())
});
