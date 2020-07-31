import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../interfaces';
import { questionService } from '../../services/question';

export const checkPassedTestData = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {lesson_id} = req.params;
    const question_list = req.body;

    const questions_id = [];
    let testResult = 0;

    for (const {question_id, chosen_answers} of question_list) {
      const {answers} = await questionService.getAnswersByQuestionId(question_id);

      const correctAnswer = answers.filter(value => value.correct);
      let chosenCorrectQuestionCount = 0;
      questions_id.push(question_id);

      for (const chosen_answer of chosen_answers) {
        answers.forEach(answer => {
          if (chosen_answer.toString() === answer._id.toString() && answer.correct) {
            chosenCorrectQuestionCount += 1;
          }
        });
      }

      const percentageRatio = chosenCorrectQuestionCount / correctAnswer.length;
      testResult += +percentageRatio.toFixed(1) * 10;
    }

    req.passed_test = {
      lesson_id,
      result: testResult,
      questions_id
    };

    next();
  } catch (e) {
    next(e);
  }
};
