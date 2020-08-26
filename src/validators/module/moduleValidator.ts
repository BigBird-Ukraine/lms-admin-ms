import * as Joi from 'joi';

export const moduleValidator = Joi.object().keys({
  label: Joi.string().max(255).trim().required(),
  description: Joi.string().trim().required(),
  tags: Joi.array().items(Joi.string()).required(),
  courses_id: Joi.array().items(Joi.string()),
  lessons_list: Joi.array().items(Joi.string())
});
