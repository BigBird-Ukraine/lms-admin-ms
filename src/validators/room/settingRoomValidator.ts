import * as Joi from 'joi';

export const settingRoomValidator = Joi.object().keys({
  label: Joi.string().max(255).trim().required(),
  period_time_to_sign_up: Joi.number().integer().max(3000),
  count_places: Joi.number().integer().max(100),
  start_at: Joi.object().required(),
  close_at: Joi.object().required()
});
