import { NextFunction, Response } from 'express';

import { IGroupSubject, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services/group';

export const updateGroupDate = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
        const group = req.group as IGroupSubject;
        group.updated_at = new Date().toString();
        await groupService.update(group._id, group);
        req.group = group;
        next();
    } catch (e) {
        next(e);
    }
};
