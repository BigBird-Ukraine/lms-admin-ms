import * as Joi from 'joi';

export const roomValidator = Joi.object().keys({
  label: Joi.string().max(255).trim().required(),
  description: Joi.string().trim().required(),
  count_all_places: Joi.number().integer().max(100).required(),
  free_places: Joi.number().integer().max(100),
  start_at: Joi.date().required(),
  close_at: Joi.date().required(),
  city: Joi.string().max(255).trim().required(),
  groups: Joi.array().items(Joi.string().trim()),
  booked_users: Joi.array().items({
    id: Joi.string().trim().required(),
    rent_start: Joi.date().required(),
    rent_end: Joi.date().required()
  })
});
