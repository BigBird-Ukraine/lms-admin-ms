import * as Joi from 'joi';

export const lessonPassedTestDataValidator = Joi.array().items(
    Joi.object().keys({
        question_id: Joi.string().trim().required(),
        chosen_answers: Joi.array().items(Joi.string())
    })
);
