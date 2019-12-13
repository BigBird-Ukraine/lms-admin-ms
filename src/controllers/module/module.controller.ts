import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
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
}

export const moduleController = new ModuleController();
