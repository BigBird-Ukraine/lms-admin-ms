import * as Joi from 'joi';

export const moduleFilterValitator = Joi.object().keys({
  label: Joi.string().max(255).trim(),
  tags: Joi.string().max(255).trim(),
  courses_id: Joi.string().max(255).trim(),
  lessons: Joi.string().max(255).trim()
});
