import * as Joi from 'joi';

export const lessonUpdateDataValidator = Joi.object().keys({
  number: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
  label: Joi.string().max(255).trim(),
  description: Joi.string().max(255).trim(),
  video_path: Joi.string().max(255).trim(),
  tags: Joi.array().items(Joi.string().max(255).trim()),
  module_id: Joi.string().max(255).trim()
});
