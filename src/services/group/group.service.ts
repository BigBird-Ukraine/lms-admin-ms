import { Group } from '../../database';
import { IGroup } from '../../interfaces';

class GroupService {

    async getAllGroups() {

    }

    createGroup(group: IGroup): Promise<void> {
        const newGroup = new Group(group);

        return newGroup.save() as any;
    }
}

export const groupService = new GroupService();
