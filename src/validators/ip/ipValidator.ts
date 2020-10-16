import * as Joi from 'joi';

export const ipValidator = Joi.object().keys({
  title: Joi.string().min(2).max(255).trim().required(),
  address: Joi.string().min(2).max(255).trim().required(),
  ip: Joi.string().min(4).max(255).trim().required()
});
