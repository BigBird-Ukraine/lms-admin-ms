import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { ILesson, IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services';
import { lessonValidator } from '../../validators';

const sortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {

    const lesson = req.body;

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

    for (const filterParamsKey in filter) {
      if (filterParamsKey) {
        filter[filterParamsKey] = {$regex: '^' + filter[filterParamsKey], $options: 'i'};
      }
    }

    const lesson = await lessonService.getLessons(+limit, +offset, sort, order, filter);

    res.json(lesson);
  }
}

export const lessonController = new LessonController();
