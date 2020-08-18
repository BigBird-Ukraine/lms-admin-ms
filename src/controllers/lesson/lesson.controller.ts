import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { calculationPageCount } from '../../helpers';
import { ILesson, IRequestExtended, IUser } from '../../interfaces';
import { lessonService, moduleService } from '../../services';
import { lessonValidator } from '../../validators';

const sortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {

    const lesson = req.body;
    lesson.user_id = req.user._id.toString();

    const lessonValidity = Joi.validate(lesson, lessonValidator);

    if (lessonValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, lessonValidity.error.details[0].message));
    }

    await lessonService.createLesson(lesson);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getLessons(req: Request, res: Response, next: NextFunction) {
    const {
      limit = 20,
      offset = 0,
      sort = '_id',
      order,
      ...filter
    } = req.query;

    if (!sortingAttributes.includes(sort)) {
      throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'Cant sort by this params');
    }

    const lesson = await lessonService.getLessons(+limit, +offset, sort, order, filter);
    const count = await lessonService.getSizeOfAll(filter) as number;

    res.json({
      data: {
        lesson,
        count,
        pageCount: calculationPageCount(count, limit)
      }
    });
  }

  async getLessonById(req: IRequestExtended, res: Response, next: NextFunction) {
    const lesson = req.lesson as ILesson;

    res.json({data: lesson});
  }

  async generateTestByLessonId(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;

    const questions_id = await lessonService.getQuestionsForTestByLessonId(lesson_id);

    res.json({data: questions_id});
  }

  async updateMyLesson(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const updatingData = req.body as Partial<ILesson>;

    const updatedLesson = await lessonService.editLessonById(lesson_id, updatingData);

    res.json({
      data: updatedLesson
    });
  }

  async addQuestionToLesson(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const {NewQuestions_id} = req.body;

    const updatedLesson = await lessonService.addQuestionsToLesson(lesson_id, NewQuestions_id);

    res.json({
      data: updatedLesson
    });
  }

  async deleteMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;

    await lessonService.deleteLessonById(lesson_id);

    res.end();
  }

  async getMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const lesson = await lessonService.getMyLesson(_id);

    res.json({
      data: {
        lesson
      }
    });
  }

  async getStatics(req: IRequestExtended, res: Response, next: NextFunction) {
    const allModules = await moduleService.getAllModulesLabel();
    const statistics = [];

    for await (const module of allModules) {
      const count = await moduleService.getLessonsStatistic(module._id);
      statistics.push({label: module.label, count, _id: module._id});
    }

    res.json(statistics);
  }

  async getLessonsByModule(req: IRequestExtended, res: Response, next: NextFunction) {
    const lessons = await lessonService.getLessonsByModule(req.query.module_id);

    res.json(lessons);
  }

  async getLessonsLabel(req: IRequestExtended, res: Response, next: NextFunction) {

    res.json(await lessonService.getLessonsLabel());
  }
}

export const lessonController = new LessonController();
