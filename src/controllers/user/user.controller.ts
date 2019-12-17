import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { IRequestExtended, IUser, IUserSubjectModel } from '../../interfaces';
import { userService } from '../../services';
import { registerDataValidator } from '../../validators';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const userValidity = Joi.validate(user, registerDataValidator);

            if (userValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
            }

            user.password = await HASH_PASSWORD(user.password);
            await userService.createUser(user);

            res.status(ResponseStatusCodesEnum.CREATED).end();

        } catch (e) {
            next(e);
        }
    }

    async getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id, email, name, surname, role_id, status_id, photo_path, groups_id} = req.user as IUser;
            const userSubjectModel: IUserSubjectModel = {
                _id,
                email,
                name,
                surname,
                role_id,
                status_id,
                photo_path,
                groups_id
            };

            res.json({data: userSubjectModel});

        } catch (e) {
            next(e);
        }
    }

    async blockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeStatus(user_id, UserStatusEnum.BLOCKED);

            res.json(`user ${user_id} has been blocked`);

        } catch (e) {
            next(e);
        }
    }

    async unBlockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeStatus(user_id, UserStatusEnum.ACTIVE);

            res.json(`user ${user_id} has been unBlocked`);

        } catch (e) {
            next(e);
        }
    }

    async changeRole(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            const role_id = req.query.role;
            await userService.changeRole(user_id, role_id);

            res.json(`user ${user_id} has been changed role`);

        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.delete(user_id);

            res.json(`user ${user_id} has been deleted`);

        } catch (e) {
            next(e);
        }
    }

    async getAll(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id} = req.user as IUser;
            const users = await userService.getAll(_id) as [IUser];

            res.json({data: users});

        } catch (e) {
            next(e);
        }
    }

    async getByID(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            const user = await userService.getByID(user_id) as IUser;

            res.json({data: user});

        } catch (e) {
            next(e);
        }
    }

    async getAllByRole(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const role_id = req.query.role;
            const users = await userService.getAllByRole(role_id);

            res.json({data: users});

        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
