import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IModule, IRequestExtended } from '../../interfaces';
import { moduleService } from '../../services';
import { moduleFilterValitator, moduleValidator } from '../../validators';

const moduleSortingAttributes: Array<keyof IModule> = ['_id', 'label', 'tags', 'courses_id', 'lessons'];

class ModuleController {

  async createModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const module = req.body;
      const moduleValidity = Joi.validate(module, moduleValidator);

      if (moduleValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, moduleValidity.error.details[0].message));
      }

      await moduleService.createModule(module);

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getModules(req: IRequestExtended, res: Response, next: NextFunction) {
    try {

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
    } catch (e) {
      next(e);
    }
  }

  async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {module_id} = req.params;

      const module = await moduleService.getModuleByID(module_id);

      res.json({
        data: module
      });
    } catch (e) {
      next(e);
    }
  }

  async editModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {module_id} = req.params;

      res.json(`${module_id} has been edited`);
    } catch (e) {
      next(e);
    }
  }

  async deleteModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {module_id} = req.params;

      await moduleService.deleteModuleByID(module_id);

      res.json(`module ${module_id} has been deleted`);
    } catch (e) {
      next(e);
    }
  }

}

export const moduleController = new ModuleController();
