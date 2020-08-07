import * as Joi from 'joi';

import { QuestionLevelEnum } from '../../constants';

const questionLevelsLength = Object.keys(QuestionLevelEnum).length;

export const inseredUpdatedQuestionValidator = Joi.object().keys({
  _id: Joi.string().trim(),
  user_id: Joi.string().trim(),
  question: Joi.alternatives().try([
    Joi.string().max(255).trim(),
    Joi.number()
  ]).required(),
  description: Joi.alternatives().try([
    Joi.string().max(255).trim(),
    Joi.number()
  ]),
  answers: Joi.array().min(3).max(5).items(
    Joi.object({
      value: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]).required(),
      correct: Joi.boolean().required()
    })
  ).required(),
  level: Joi.alternatives().try([
    Joi.string().max(255).trim(),
    Joi.number().integer().min(1).max(questionLevelsLength)
  ]).required(),
  subject: Joi.alternatives().try([
    Joi.string().max(255).trim(),
    Joi.number()
  ]).required(),
  group: Joi.array().items(Joi.alternatives().try([
    Joi.string().max(255).trim(),
    Joi.number()
  ])).required(),
  tags: Joi.array().items(Joi.string().max(255).trim()).required(),
  lesson_id: Joi.array().items(Joi.string().max(255).trim()),
  __v: Joi.number().integer()
});
