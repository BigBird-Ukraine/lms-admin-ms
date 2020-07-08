import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { moduleSortingAttributes, regexFilterParams } from '../../helpers';
import { IRequestExtended } from '../../interfaces';
import { moduleService } from '../../services';

class ModuleController {

    async createModule(req: IRequestExtended, res: Response, next: NextFunction) {
        const module = req.body;

        await moduleService.createModule(module);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    async getModules(req: IRequestExtended, res: Response, next: NextFunction) {
        const {
            pageSize,
            pageIndex,
            offset = pageSize * pageIndex,
            order = '_id',
            ...filterParams
        } = req.query;

        moduleSortingAttributes(order);
        const updatedParams = regexFilterParams(filterParams);

        const modules = await moduleService.getModulesByParams(updatedParams, +pageSize, offset, order);
        const count = await moduleService.getSizeOfAll(updatedParams) as number;

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

    editModule(req: IRequestExtended, res: Response, next: NextFunction) {
        const {module_id} = req.params;

        res.json(`${module_id} has been edited`);
    }

    async deleteModule(req: IRequestExtended, res: Response, next: NextFunction) {
        const {module_id} = req.params;

        await moduleService.deleteModuleByID(module_id);

        res.json(`module ${module_id} has been deleted`);
    }

}

export const moduleController = new ModuleController();
