import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { checkDeletedObjects } from '../../helpers';
import { ICourseSubject, IRequestExtended } from '../../interfaces';
import { courseService, moduleService } from '../../services';
import { courseValidator, filterParametresValidator, modulesListValidator } from '../../validators';

class CourseController {

  async createCourse(req: IRequestExtended, res: Response, next: NextFunction) {

    const course = req.body;
    const courseValidity = Joi.validate(course, courseValidator);

    if (courseValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, courseValidity.error.details[0].message));
    }

    await courseService.createCourse(course);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {

    const {
      pageSize,
      pageIndex,
      offset = pageSize * pageIndex,
      order = '_id',
      ...filterParams
    } = req.query;

    const filterValidity = Joi.validate(filterParams, filterParametresValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    for (const filterParamsKey in filterParams) {
      if (filterParamsKey) {
        filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
      }
    }

    const courses = await courseService.getCourses(filterParams, +pageSize, offset, order);
    const count = await courseService.getSizeOfAll(filterParams) as number;
    res.json({
      data: {
        courses,
        count
      }
    });
  }

  async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {course_id} = req.params;

    const course = await courseService.getCourseByID(course_id);

    res.json({
      data: course
    });
  }

  async updateById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {course_id} = req.params;
    const course = req.body as ICourseSubject;

    const filterValidity = Joi.validate(course, courseValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }
    await courseService.updateCourse(course_id, course);

    res.end();
  }

  async updateModulesList(req: IRequestExtended, res: Response, next: NextFunction) {

    const {course_id} = req.params;
    const modules = req.body as Partial<ICourseSubject>;
    const filterValidity = Joi.validate(modules, modulesListValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    const {modules_list} = await courseService.getByID(course_id);

    if (modules.modules_list) {
      const { deleted , updated} = checkDeletedObjects(modules_list, modules.modules_list);

      if (updated.length) { await moduleService.addModuleInCourse(updated, course_id); }
      if (deleted.length) { await moduleService.deleteModuleOfCourse(deleted, course_id); }
    }

    await courseService.updateCourse(course_id, modules);

    res.end();
  }

  async deleteCourseById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {course_id} = req.params;

    await courseService.deleteCourseByID(course_id);

    res.json(`course ${course_id} has been deleted`);
  }
}

export const courseController = new CourseController();
