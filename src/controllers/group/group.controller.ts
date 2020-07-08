import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { regexFilterParams } from '../../helpers';
import { IGroup, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services';

class GroupController {

    async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {
        const {
            pageSize,
            pageIndex,
            offset = pageSize * pageIndex,
            order = '_id',
            ...filterParams
        } = req.query;

        const updatedFilterParams = regexFilterParams(filterParams);

        const groups = await groupService.getAllGroups(updatedFilterParams, +pageSize, offset, order);
        const count = await groupService.getSizeOfAll(updatedFilterParams) as number;

        res.json({
            data: {
                groups,
                count
            }
        });
    }

    getGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
        const group = req.group as IGroup;

        res.json({data: group});
    }

    async createGroup(req: IRequestExtended, res: Response, next: NextFunction) {
        const group = req.body;

        await groupService.createGroup(group);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    async editGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
        const {group_id} = req.params;
        const group = req.body as IGroup;

        await groupService.update(group_id, group);

        res.end();
    }

    async changeUserListById(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id} = req.group as IGroup;
        const list = req.body as Partial<IGroup>;

        await groupService.update(_id, list);

        res.end();
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id} = req.group as Partial<IGroup>;

        if (_id) {
            await groupService.delete(_id);
        }

        res.end();
    }
}

export const groupController = new GroupController();
