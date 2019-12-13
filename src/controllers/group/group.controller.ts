import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { groupService } from '../../services';
import { groupValidator } from '../../validators';

class GroupController {

    async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const courses = await groupService.getAllGroups(); // TODO

            res.json({
                data: courses
            });
        } catch (e) {
            next(e);
        }
    }

    async createGroup(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const group = req.body;
            // TODO normally validator
            const groupValidity = Joi.validate(group, groupValidator);

            if (groupValidity.error) {
                return next( new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
            }

            await groupService.createGroup(group); // TODO

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    editGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { group_id } = req.params;

            res.json(`${group_id} edited (NO)`);
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
