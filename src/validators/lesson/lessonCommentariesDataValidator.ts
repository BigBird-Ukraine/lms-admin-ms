import * as Joi from 'joi';

export const lessonCommentariesDataValidator = Joi.object().keys({
    text: Joi.string().max(2000).trim().required()
  }
);
