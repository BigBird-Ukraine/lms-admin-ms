import * as Joi from 'joi';

export const lessonFilterParametresValidator = Joi.object().keys({
  number: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
  label: Joi.string().max(255).trim(),
  tags: Joi.string().max(255).trim()
});
