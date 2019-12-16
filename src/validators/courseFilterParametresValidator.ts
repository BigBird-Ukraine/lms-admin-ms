import * as Joi from 'joi';

export const filterParametresValidator = Joi.object().keys({
  label: Joi.string().max(255).trim(),
  level: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
  module_list: Joi.array().items(Joi.string().max(255).trim())
});
