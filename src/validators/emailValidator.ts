import * as Joi from 'joi';

import { RegExpEnum } from '../constants';

export const emailValidator = Joi.object().keys({
    email: Joi.string().max(255).regex(RegExpEnum.email).trim().required()
});
