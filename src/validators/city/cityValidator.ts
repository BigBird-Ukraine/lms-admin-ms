import * as Joi from 'joi';

export const cityValidator = Joi.object().keys({
  title: Joi.string().min(2).max(255).trim().required(),
  country: Joi.string().min(2).max(255).trim().required()
});
