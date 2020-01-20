import {NextFunction, Response} from 'express';
import * as Joi from 'joi';

import {ResponseStatusCodesEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {IGroup, IGroupSubject, IRequestExtended} from '../../interfaces';
import {groupService} from '../../services';
import {groupFilterValidator, groupUpdateValidator, groupValidator} from '../../validators';

class GroupController {
    async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                pageSize,
                pageIndex,
                offset = pageSize * pageIndex,
                order = '_id',
                ...filterParams
            } = req.query;
            const filterValidity = Joi.validate(filterParams, groupFilterValidator);

            if (filterValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
            }

            for (const filterParamsKey in filterParams) {
                if (filterParamsKey) {
                    filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
                }
            }
            const groups = await groupService.getAllGroups(filterParams, +pageSize, offset, order);
            const count = await groupService.getSizeOfAll(filterParams) as number;
            res.json({
                data: {
                    groups,
                    count
                }
            });
        } catch (e) {
            next(e);
        }
    }

    async getGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const group = req.group as IGroup;
            res.json({data: group});
        } catch (e) {
            next(e);
        }
    }

    async createGroup(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const group = req.body;

            const groupValidity = Joi.validate(group, groupValidator);

            if (groupValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
            }

            await groupService.createGroup(group);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    async editGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {group_id} = req.params;
            const group = req.body as IGroupSubject;

            const groupValidity = Joi.validate(group, groupValidator);

            if (groupValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
            }

            await groupService.update(group_id, group);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async changeUserListById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id} = req.group as IGroup;
            const list = req.body as Partial<IGroupSubject>;
            const groupValidity = Joi.validate(list, groupUpdateValidator);

            if (groupValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
            }
            await groupService.update(_id, list);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id} = req.group as Partial<IGroup>;

            if (_id) {
                await groupService.delete(_id);
            }
            res.end();
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
