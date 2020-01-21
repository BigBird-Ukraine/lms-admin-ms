import * as Joi from 'joi';

import { RegExpEnum } from '../../constants/enums';

export const adminPatchUserValidator = Joi.object().keys({
  name: Joi.string().min(2).max(255).trim(),
  surname: Joi.string().min(2).max(255).trim(),
  phone_number: Joi.string().regex(RegExpEnum.phone_number).length(10).trim(),
  email: Joi.string().email().max(255).trim(),
  groups_id: Joi.string().max(255).trim(),
  photo_path: Joi.string().max(255).trim()
}).min(1);
