import * as Joi from 'joi';

export const roomUpdatedDataValidator = Joi.object().keys({
  label: Joi.string().max(255).trim(),
  description: Joi.string().trim(),
  count_all_places: Joi.number().integer().max(100),
  free_places: Joi.number().integer().max(100),
  start_at: Joi.date(),
  close_at: Joi.date(),
  city: Joi.string().max(255).trim(),
  groups: Joi.array().items(Joi.string().trim()),
  booked_users: Joi.array().items({
    user_id: Joi.string().trim().required(),
    table_number: Joi.string().trim().required(),
    rent_start: Joi.date().required(),
    rent_end: Joi.date().required()
  }),
  confirm_status: Joi.number().integer(),
  cron_job_touched: Joi.number().integer(),
  ip_address: Joi.string().trim()
});
