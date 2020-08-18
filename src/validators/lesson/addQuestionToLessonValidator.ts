import * as Joi from 'joi';

export const addQuestionToLessonValidator = Joi.array().items(Joi.string().max(255).trim());
