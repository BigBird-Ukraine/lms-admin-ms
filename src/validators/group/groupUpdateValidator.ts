import * as Joi from 'joi';
import {userFilterValidator} from '../user';

export const groupUpdateValidator = Joi.object().keys({
    users_list: Joi.array().items(userFilterValidator)
});
