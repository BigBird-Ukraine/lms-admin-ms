import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Group, GroupSchema, GroupType } from '../../database';
import { IGroup } from '../../interfaces';

class GroupService {

  getAllGroups(filterParams: Partial<IGroup>, limit: number, skip: number, order: string): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .find(filterParams)
      .populate('course_id')
      .populate('users_list')
      .limit(limit)
      .skip(skip)
      .sort(order) as any;
  }

  getSizeOfAll(filterParams: Partial<IGroup>): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .countDocuments(filterParams) as any;
  }

  createGroup(group: IGroup): Promise<void> {
    const newGroup = new Group(group);

    return newGroup.save() as any;
  }

  update(group_id: string, patchObject: Partial<IGroup>): Promise<any> {
    patchObject.updated_at = new Date().toString();
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .findByIdAndUpdate(group_id, patchObject) as any;
  }

  delete(_id: string): Promise<void> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel.findByIdAndDelete(_id) as any;
  }

  async getById(group_id: string): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel.findById(group_id) as any;
  }
}

export const groupService = new GroupService();
