import * as Joi from 'joi';

export const moduleValidator  = Joi.object().keys({
  label: Joi.string().max(255).trim().required(),
  description: Joi.string().max(255).trim(),
  tags: Joi.array().items(Joi.string()),
  course_id: Joi.array().items(Joi.string()),
  lessons: Joi.array().items(Joi.string())
});
