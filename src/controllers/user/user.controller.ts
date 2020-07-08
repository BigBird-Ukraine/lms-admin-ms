import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum, UserRoleEnum, UserStatusEnum } from '../../constants';
import { HASH_PASSWORD, regexFilterWithoutRoleParams } from '../../helpers';
import { IRequestExtended, IUser, IUserSubject } from '../../interfaces';
import { groupService, userService } from '../../services';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        const user = req.body as IUser;

        user.role_id = UserRoleEnum.STUDENT;

        user.password = await HASH_PASSWORD(user.password);
        await userService.createUser(user);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
        const user = req.user as IUser;

        res.json({data: user});
    }

    async blockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.changeStatus(user_id, UserStatusEnum.BLOCKED);

        res.end();
    }

    async unBlockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.changeStatus(user_id, UserStatusEnum.ACTIVE);

        res.end();
    }

    async updateUserByID(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;
        const updateInfo = req.body as IUser;

        const user = await userService.updateUser(user_id, updateInfo);

        res.json(user);
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.delete(user_id);

        res.end();
    }

    async getAll(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id} = req.user as IUser;
        const {
            pageSize,
            pageIndex,
            offset = pageSize * pageIndex,
            order = 'surname',
            ...filterParams
        } = req.query;

        const updatedParams = regexFilterWithoutRoleParams(filterParams);

        const users = await userService.getAll(_id, updatedParams, +pageSize, offset, order) as IUserSubject[];

        for (const user of users) {
            user.groups_id = await groupService.getAllGroupsByUserId(user._id);
        }
        const count = await userService.getSizeOfAll(_id, updatedParams) as number;

        res.json({
            data: {
                users,
                count
            }
        });
    }

    async getByID(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        const user = await userService.getByID(user_id) as IUser;

        res.json({data: user});
    }

    async makeUserTeacher(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.updateUser(user_id, {role_id: UserRoleEnum.TEACHER});

        res.end();
    }

    async makeUserAdmin(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.updateUser(user_id, {role_id: UserRoleEnum.ADMIN});

        res.end();
    }

    async makeUserStudent(req: IRequestExtended, res: Response, next: NextFunction) {
        const {user_id} = req.params;

        await userService.updateUser(user_id, {role_id: UserRoleEnum.STUDENT});

        res.end();
    }
}

export const userController = new UserController();
