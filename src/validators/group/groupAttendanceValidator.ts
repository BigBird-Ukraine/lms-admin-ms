import * as Joi from 'joi';

export const groupAttendanceValidator = Joi.object().keys({
  date: Joi.string().trim().required(),
  present_students_id: Joi.array().items(Joi.string().max(255).trim()).required(),
  absent_students_id: Joi.array().items(Joi.string().max(255).trim()).required()
});
