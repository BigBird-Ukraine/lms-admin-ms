import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { checkDeletedObjects } from '../../helpers';
import { IModule, IRequestExtended } from '../../interfaces';
import { courseService, lessonService, moduleService } from '../../services';
import { moduleFilterValitator, moduleValidator } from '../../validators';

const moduleSortingAttributes: Array<keyof IModule> = ['_id', 'label', 'tags', 'courses_id', 'lessons_list'];

class ModuleController {

  async createModule(req: IRequestExtended, res: Response, next: NextFunction) {
    const module = req.body;
    const moduleValidity = Joi.validate(module, moduleValidator);

    if (moduleValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, moduleValidity.error.details[0].message));
    }

    const {_id} = await moduleService.createModule(module);

    if (module.lessons_list.length) {
      await lessonService.addModuleInLesson(module.lessons_list, _id);
    }

    res.json(ResponseStatusCodesEnum.CREATED);
  }

  async getModules(req: IRequestExtended, res: Response, next: NextFunction) {

    const {
      pageSize,
      pageIndex,
      offset = pageSize * pageIndex,
      order = '_id',
      ...filterParams
    } = req.query;

    const filterValidity = Joi.validate(filterParams, moduleFilterValitator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    if (!moduleSortingAttributes.includes(order)) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'You can\'t sort by this parameter'));
    }

    for (const filterParamsKey in filterParams) {
      if (filterParamsKey) {
        filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
      }
    }

    const modules = await moduleService.getModulesByParams(filterParams, +pageSize, offset, order);
    const count = await moduleService.getSizeOfAll(filterParams) as number;
    res.json({
      data: {
        modules,
        count
      }
    });
  }

  async getModuleByIdWithLessons(req: IRequestExtended, res: Response, next: NextFunction) {

    const {module_id} = req.params;

    const module = await moduleService.getModuleByIDWithLessons(module_id);

    res.json({
      data: module
    });
  }

  async getCroppedModules(req: IRequestExtended, res: Response, next: NextFunction) {
    const module = await moduleService.getCroppedModules();

    res.json({
      data: module
    });
  }

  async editModule(req: IRequestExtended, res: Response, next: NextFunction) {
    const {module_id} = req.params;

    const updatedModule = await moduleService.editModule(module_id, req.body);

    res.json(updatedModule);
  }

  async deleteModule(req: IRequestExtended, res: Response, next: NextFunction) {

    const {module_id} = req.params;

    await moduleService.deleteModuleByID(module_id);

    res.json(`module ${module_id} has been deleted`);
  }

  async getStatics(req: IRequestExtended, res: Response, next: NextFunction) {
    const allSubjects = await courseService.getAllCourseLabel();
    const statistics = [];

    for await (const subject of allSubjects) {
      const count = await courseService.getModulesStatistic(subject.label, subject._id);
      statistics.push({label: subject.label, count: count[0].modules_list, _id: subject._id});
    }

    res.json(statistics);
  }

  async getModulesByCourseId(req: IRequestExtended, res: Response, next: NextFunction) {
    const modules = await moduleService.getModulesByCourseId(req.query.course_id);

    res.json(modules);
  }

  async updateLessonList(req: IRequestExtended, res: Response, next: NextFunction) {
    const {module_id} = req.params;
    const {lessons_list} = req.body as Partial<IModule>;

    const module = await moduleService.getModuleById(module_id);

    if (lessons_list) {
      const { deleted , updated} =  checkDeletedObjects(module.lessons_list, lessons_list);

      if (updated.length) { await lessonService.addModuleInLesson(updated, module_id); }
      if (deleted.length) { await lessonService.deleteModuleOfLesson(deleted, module_id); }
    }

    await moduleService.updateModule(module_id, lessons_list);

    res.end();
  }
}

export const moduleController = new ModuleController();
