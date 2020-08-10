import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IGroup, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services';
import { groupFilterValidator, groupUpdateValidator, groupValidator } from '../../validators';

class GroupController {

  async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {

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
  }

  getGroupById(req: IRequestExtended, res: Response, next: NextFunction) {

    const group = req.group as IGroup;

    res.json({data: group});
  }

  async createGroup(req: IRequestExtended, res: Response, next: NextFunction) {

    const group = req.body;

    const groupValidity = Joi.validate(group, groupValidator);

    if (groupValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }

    await groupService.createGroup(group);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async editGroupById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {group_id} = req.params;
    const group = req.body as IGroup;

    const groupValidity = Joi.validate(group, groupValidator);

    if (groupValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }

    await groupService.update(group_id, group);
    res.end();
  }

  async changeUserListById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {_id} = req.group as IGroup;
    const list = req.body as Partial<IGroup>;
    const groupValidity = Joi.validate(list, groupUpdateValidator);

    if (groupValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }
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

  async addNewVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    const {group_id} = req.params;
    const visit_log = req.body;

    await groupService.addVisit_log(group_id, visit_log);

    res.end();
  }
}

export const groupController = new GroupController();
