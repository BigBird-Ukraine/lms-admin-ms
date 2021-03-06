import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import {
  calculationPageCount,
  questionSortingAttributes,
  regexFilterParams
} from '../../helpers';
import { IRequestExtended, IUser } from '../../interfaces';
import { courseService, lessonService, questionService } from '../../services';

class QuestionController {

  async getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        limit = 20,
        offset = 0,
        sort = '_id',
        order,
        ...filter
      } = req.query;

      questionSortingAttributes(sort);
      const updatedFilterParams = regexFilterParams(filter);

      const questions = await questionService.getQuestions(+limit, +offset, sort, order, filter);
      const count = await questionService.getSizeOfAll(updatedFilterParams) as number;

      res.json({
        data: {
          questions,
          count,
          pageCount: calculationPageCount(count, limit)
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async createQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    const questionValue = req.body;
    const {_id} = req.user as IUser;

    await questionService.createQuestion({...questionValue, user_id: _id});

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async updateQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    await questionService.updateQuestion(req.body);
    await lessonService.resetLastValidLessons(req.body.lesson_id);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getMyQuestions(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const {limit = 20, offset = 0} = req.query;

    const questions = await questionService.getMyQuestion(_id, +limit, +offset);

    res.json({
      data: {
        questions,
        count: questions.length,
        pageCount: calculationPageCount(questions.length, limit)
      }
    });
  }

  async deleteQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    const {question_id} = req.params;

    const { lesson_id } = await questionService.getQuestionById(question_id) as any;
    await lessonService.resetLastValidLessons(lesson_id);
    await questionService.deleteQuestionById(question_id);

    res.end();
  }

  async getStatics(req: IRequestExtended, res: Response, next: NextFunction) {
    const allSubjects = await courseService.getAllCourseLabel();
    const statistics = [];

    for await (const subject of allSubjects) {
      const count = await questionService.getQuestionsStatistic(subject.label);
      statistics.push({label: subject.label, count});
    }

    res.json(statistics);
  }

  async getQuestionsBySubject(req: IRequestExtended, res: Response, next: NextFunction) {
    const questions = await questionService.getQuestionBySubject(req.query.subject);

    res.json(questions);
  }
}

export const questionController = new QuestionController();
