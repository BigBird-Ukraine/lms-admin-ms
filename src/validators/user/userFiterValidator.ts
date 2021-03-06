import * as Joi from 'joi';

export const userFilterValidator = Joi.object().keys({
  name: Joi.string().max(255).trim(),
  surname: Joi.string().max(255).trim(),
  phone_number: Joi.string().max(255).trim(),
  email: Joi.string().max(255).trim(),
  population_point: Joi.string().max(255).min(2).trim(),
  status_id: Joi.number().integer().min(1),
  role_id: Joi.number().integer().min(1),
  created_at: Joi.string().max(255).trim(),
  updated_at: Joi.string().max(255).trim(),
  groups_id: Joi.array().items(Joi.string().max(255).trim()),
  passed_tests: Joi.array().items(Joi.string().max(255).trim())
});
