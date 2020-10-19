import * as Joi from 'joi';

export const ipValidator = Joi.object().keys({
  title: Joi.string().min(2).max(255).trim().required(),
  fullAddress: Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    address: Joi.string().min(2).max(255).trim().required()
  }).required(),
  ip: Joi.string().min(4).max(255).trim().required(),
  city: Joi.string().min(4).max(255).trim().required()
});
