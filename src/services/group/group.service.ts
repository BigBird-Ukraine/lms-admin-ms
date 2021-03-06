import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Group, GroupSchema, GroupType, User } from '../../database';
import { IAttendance, IGroup, IGroupSubject } from '../../interfaces';

class GroupService {

  getAllGroups(filterParams: Partial<IGroup>, limit: number, skip: number, order: string): Promise<IGroupSubject[]> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel
      .find(filterParams)
      .populate('course_id')
      .populate('users_list')
      .limit(limit)
      .skip(skip)
      .sort(order) as any;
  }

  getAllGroupsByUserId(user_id: string): Promise<IGroupSubject[]> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel
      .find({users_list: {$in: user_id}})
      .populate('course_id') as any;

  }

  getSizeOfAll(filterParams: Partial<IGroup>): Promise<number> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel
      .countDocuments(filterParams) as any;
  }

  createGroup(group: IGroup): Promise<void> {
    const newGroup = new Group(group);

    return newGroup.save() as any;
  }

  update(group_id: string, patchObject: Partial<IGroup>): Promise<void> {
    patchObject.updated_at = new Date().toString();
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel
      .findByIdAndUpdate(group_id, patchObject) as any;
  }

  delete(_id: string): Promise<void> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel.findByIdAndDelete(_id, (err) => {
      User.update(
        { groups_id: _id },
        { $pull: { groups_id: _id } },
        { multi: true })
        .exec();
    }) as any;
  }

  getById(group_id: string): Promise<IGroup> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findById(group_id) as any;
  }

  async addVisit_log(group_id: string, visit_log: IAttendance): Promise<void> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    const group = await GroupModel.findById(group_id);
    if (group && group.attendance) {
      const index = group.attendance.findIndex(el => el.date === visit_log.date);
      index === -1 ? group.attendance.push(visit_log) :  group.attendance[index] = visit_log;
    }

    return group && GroupModel.findByIdAndUpdate(group_id, {$set: {attendance: group.attendance}}) as any;
  }

  getGroupsStatistic(course_id: string) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel
      .countDocuments({course_id}) as any;
  }

  getGroupsByCourseId(course_id: string) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.find({course_id})
      .select({city: 1, label: 1, created_at: 1, finished_at: 1});
  }

  async deleteVisitLog(group_id: string, attendance_id: string) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    await GroupModel.update(
      {_id: group_id},
      {
        $pull: {
          attendance: {
            _id: attendance_id
          }
        }
      }
    );
  }

  async editVisitLog(group_id: string, attendance: IAttendance[]) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findByIdAndUpdate(group_id, {attendance});
  }
}

export const groupService = new GroupService();
