import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';
import { courseValidator, filterParametresValidator } from '../../validators';

const courseSortingAttributes: Array<keyof ICourse> = ['_id', 'label', 'level', 'modules_list'];

class CourseController {

  async createCourse(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const course = req.body;
      const courseValidity = Joi.validate(course, courseValidator);

      if (courseValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, courseValidity.error.details[0].message));
      }

      await courseService.createCourse(course);

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {
    try {

      const {
        limit = 20,
        offset = 0,
        sort = '_id',
        order,
        ...filter
      } = req.query;

      const filterValidity = Joi.validate(filter, filterParametresValidator);

      if (filterValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
      }

      if (!courseSortingAttributes.includes(sort)) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'You can\'t sort by this parameter'));
      }

      const courses = await courseService.getAllCourses(+limit, +offset, sort, order, filter);
      const count = courses.length;
      const pageCount = Math.ceil(count / limit);

      res.json({
        data: {
          courses,
          count,
          pageCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { course_id } = req.params;

      const course = await courseService.getCourseByID(course_id);

      res.json({
        data: course
      });

    } catch (e) {
      next(e);
    }
  }

  editCourse(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { course_id } = req.params;

      res.json(`${course_id} edited (NO)`);
    } catch (e) {
      next(e);
    }
  }

  async deleteCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { course_id } = req.params;

      await courseService.deleteCourseByID(course_id);

      res.json(`course ${course_id} has been deleted`);
    } catch (e) {
      next(e);
    }
  }
}

export const courseController = new CourseController();
