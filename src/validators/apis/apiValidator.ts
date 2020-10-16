import * as Joi from 'joi';

export const apiValidator = Joi.object().keys({
  title: Joi.string().min(2).max(255).trim().required(),
  address: Joi.string().min(2).max(255).trim().required(),
  api: Joi.string().min(4).max(255).trim().required()
});
