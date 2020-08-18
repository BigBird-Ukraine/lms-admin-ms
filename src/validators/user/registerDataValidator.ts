import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const registerDataValidator = Joi.object().keys({
  email: Joi.string().max(255).regex(RegExpEnum.email).trim().required(),
  password: Joi.string().max(255).regex(RegExpEnum.password).min(8).trim().required(),
  name: Joi.string().max(255).min(2).trim().required(),
  surname: Joi.string().max(255).min(2).trim().required(),
  population_point: Joi.string().max(255).min(2).trim().required(),
  photo_path: Joi.string().max(255).trim(),
  phone_number: Joi.string().min(8).max(16).trim()
});
