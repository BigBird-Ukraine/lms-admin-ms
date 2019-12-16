import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { moduleService } from '../../services';
import { moduleValidator } from '../../validators';

class ModuleController {

  async createModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const module = req.body;
      const moduleValidity = Joi.validate(module, moduleValidator);

      if (moduleValidity.error) {
        return next( new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, moduleValidity.error.details[0].message));
      }

      await moduleService.createModule(module);

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getAllModules(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const modules = await moduleService.getAllModules();

      res.json({
        data: modules
      });
    } catch (e) {
      next(e);
    }
  }

  async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { module_id } = req.params;

      const module = await moduleService.getModuleByID(module_id);

      if (!module) {
        return next (new ErrorHandler(
          ResponseStatusCodesEnum.NOT_FOUND,
          errors.NOT_FOUND_MODULE_PRESENT.message,
          errors.NOT_FOUND_MODULE_PRESENT.code));
      }

      res.json({
        data: module
      });
    } catch (e) {
      next(e);
    }
  }

  async editModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { module_id } = req.params;

      res.json( `${module_id} has been edited`);
    } catch (e) {
      next(e);
    }
  }

  async deleteModule(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { module_id } = req.params;

      await moduleService.deleteModuleByID(module_id);

      res.json(`module ${module_id} has been deleted`);
    } catch (e) {
      next(e);
    }
  }

}

export const moduleController = new ModuleController();
