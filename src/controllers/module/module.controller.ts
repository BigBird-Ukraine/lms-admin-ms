import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IModule, IRequestExtended } from '../../interfaces';
import { courseService, moduleService } from '../../services';
import { moduleFilterValitator, moduleValidator } from '../../validators';

const moduleSortingAttributes: Array<keyof IModule> = ['_id', 'label', 'tags', 'courses_id', 'lessons'];

class ModuleController {

  async createModule(req: IRequestExtended, res: Response, next: NextFunction) {
    const module = req.body;
    const moduleValidity = Joi.validate(module, moduleValidator);

    if (moduleValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, moduleValidity.error.details[0].message));
    }

    res.json( await moduleService.createModule(module));
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

  async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {module_id} = req.params;

    const module = await moduleService.getModuleByID(module_id);

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

  editModule(req: IRequestExtended, res: Response, next: NextFunction) {

    const {module_id} = req.params;

    res.json(`${module_id} has been edited`);
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
}

export const moduleController = new ModuleController();
