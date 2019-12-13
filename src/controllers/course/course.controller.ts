import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';
import { courseValidator } from '../../validators';

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

  async getAllCourses(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getAllCourses();

      res.json({
        data: courses
      });
    } catch (e) {
      next(e);
    }
  }

  async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { course_id } = req.params;

      const gettingCourse = await courseService.getCourseByID(course_id);

      if (!gettingCourse) {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.NOT_FOUND,
          errors.NOT_FOUND_COURSE_NOT_PRESENT.message,
          errors.NOT_FOUND_COURSE_NOT_PRESENT.code
        ));
      }
      res.json({
        data: gettingCourse
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

      res.status(ResponseStatusCodesEnum.OK).json(`course ${course_id} has been deleted`);
    } catch (e) {
      next(e);
    }
  }
}

export const courseController = new CourseController();
