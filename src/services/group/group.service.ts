import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Group, GroupSchema, GroupType } from '../../database';
import { IGroup, IGroupSubject } from '../../interfaces';

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
    return GroupModel.findByIdAndDelete(_id) as any;
  }

  getById(group_id: string): Promise<IGroup> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findById(group_id) as any;
  }
}

export const groupService = new GroupService();
