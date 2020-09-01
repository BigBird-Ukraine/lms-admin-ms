import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { checkDeletedObjects, editVisitLog } from '../../helpers';
import { IAttendance, IGroup, IRequestExtended } from '../../interfaces';
import { courseService, groupService, userService } from '../../services';
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
    const list = req.body;

    const groupValidity = Joi.validate(list, groupUpdateValidator);
    if (groupValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, groupValidity.error.details[0].message));
    }

    const {users_list} = await groupService.getById(_id);

    const {deleted, updated} = checkDeletedObjects(users_list, list.users_list);

    if (updated.length) { await userService.addGroupInUser(updated, _id); }
    if (deleted.length) { await userService.deleteGroupOfUser(deleted, _id); }

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

  async getStatics(req: IRequestExtended, res: Response, next: NextFunction) {
    const allSubjects = await courseService.getAllCourseLabel();
    const statistics = [];

    for await (const subject of allSubjects) {
      const count = await groupService.getGroupsStatistic(subject._id);
      statistics.push({label: subject.label, count, _id: subject._id});
    }

    res.json(statistics);
  }

  async getGroupsByCourseId(req: IRequestExtended, res: Response, next: NextFunction) {
    const groups = await groupService.getGroupsByCourseId(req.query.course_id);

    res.json(groups);
  }

  async deleteVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    const group = req.group as IGroup;
    const {visitId} = req.query;

    await groupService.deleteVisitLog(group._id, visitId);

    res.end();
  }

  async editVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    const group = req.group as IGroup;
    const {visitId, studentId} = req.query;

    const attendances = editVisitLog(group, visitId, studentId) as IAttendance[];

    await groupService.editVisitLog(group._id, attendances);

    res.json(attendances);
  }
}

export const groupController = new GroupController();
