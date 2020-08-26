import * as Joi from 'joi';

export const courseValidator = Joi.object().keys({
  label: Joi.string().min(4).max(255).trim().required(),
  level: Joi.number().integer().min(1),
  description: Joi.string().trim(),
  modules_list: Joi.array().items(Joi.string())
});
