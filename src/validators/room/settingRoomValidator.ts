import * as Joi from 'joi';

export const settingRoomValidator = Joi.object().keys({
  label: Joi.string().max(255).trim().required(),
  count_places: Joi.number().integer().max(100),
  start_at: Joi.object().required(),
  close_at: Joi.object().required(),
  cities: Joi.array().items(Joi.string().max(255).trim())
});
