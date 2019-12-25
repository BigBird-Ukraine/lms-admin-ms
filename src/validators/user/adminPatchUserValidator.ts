import * as Joi from 'joi';

export const adminPatchUserValidator = Joi.object().keys({
  name: Joi.string().max(255).trim(),
  surname: Joi.string().max(255).trim(),
  phone_number: Joi.string().regex(/^[0-9]{10}$/).length(10).trim(),
  email: Joi.string().max(255).trim(),
  groups_id: Joi.string().max(255).trim(),
  photo_path: Joi.string().max(255).trim()
});
