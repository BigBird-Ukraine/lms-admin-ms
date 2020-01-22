import * as Joi from 'joi';

export const groupUpdateValidator = Joi.object().keys({
  users_list: Joi.array().items(Joi.string().min(0).max(255).trim())
});
