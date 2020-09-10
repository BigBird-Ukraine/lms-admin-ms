import * as Joi from 'joi';

export const lessonValidator = Joi.object().keys({
  number: Joi.alternatives().try([Joi.string().max(255).trim().required()]),
  label: Joi.string().max(255).trim().required(),
  description: Joi.string().trim(),
  video_path: Joi.string().trim(),
  tags: Joi.array().items(Joi.string().max(255).trim()),
  module_id: Joi.string().max(255).trim(),
  user_id: Joi.string().trim().required()
});
