import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const updateDataValidator = Joi.object().keys({
  email: Joi.string().max(255).regex(RegExpEnum.email).trim(),
  phone_number: Joi.string().max(10).regex(RegExpEnum.phone_number).trim(),
  photo_path: Joi.string().max(255).trim(),
  city: Joi.string().max(255).min(2).trim()
}).min(1);
