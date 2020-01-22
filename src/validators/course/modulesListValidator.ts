import * as Joi from 'joi';

export const modulesListValidator = Joi.object().keys({
  modules_list: Joi.array().items(Joi.string().min(1).max(255).trim())
});
