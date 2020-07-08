import { Request } from 'express-serve-static-core';
import { IGroup } from './group.model';
import { IUser } from './user.model';

export interface IRequestExtended extends Request {
    user?: IUser;
    group?: IGroup;
    files?: any;
}
