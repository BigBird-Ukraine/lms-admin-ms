import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

import {ResponseStatusCodesEnum, UserRoleEnum, UserStatusEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {HASH_PASSWORD} from '../../helpers';
import {IRequestExtended, IUser} from '../../interfaces';
import {userService} from '../../services';
import {adminPatchUserValidator, registerDataValidator, userFilterValidator} from '../../validators';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUser;
            const userValidity = Joi.validate(user, registerDataValidator);

            if (userValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
            }

            user.password = await HASH_PASSWORD(user.password);
            user.role_id = UserRoleEnum.STUDENT;

            await userService.createUser(user);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    async getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;

            res.json({data: user});

        } catch (e) {
            next(e);
        }
    }

    async blockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeStatus(user_id, UserStatusEnum.BLOCKED);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async unBlockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeStatus(user_id, UserStatusEnum.ACTIVE);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async updateUserByID(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            const updateInfo = req.body as IUser;
            const updateValidity = Joi.validate(updateInfo, adminPatchUserValidator);

            if (updateValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, updateValidity.error.details[0].message));
            }

            await userService.updateUser(user_id, updateInfo);
            const user = await userService.getByID(user_id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.delete(user_id);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id} = req.user as IUser;
            const {
                pageSize,
                pageIndex,
                offset = pageSize * pageIndex,
                order = 'surname',
                ...filterParams
            } = req.query;

            const filterValidity = Joi.validate(filterParams, userFilterValidator);

            if (filterValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
            }

            for (const filterParamsKey in filterParams) {  //TODO Victor
                if (filterParamsKey !== 'role_id') {
                    filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
                }
            }

            const users = await userService.getAll(_id, filterParams, +pageSize, offset, order) as [IUser];
            const count = await userService.getSizeOfAll(_id, filterParams) as number;
            res.json({
                data: {
                    users,
                    count
                }
            });

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

    async makeUserTeacher(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.updateUser(user_id, {role_id: UserRoleEnum.TEACHER});

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async makeUserAdmin(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.updateUser(user_id, {role_id: UserRoleEnum.ADMIN});

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async makeUserStudent(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.updateUser(user_id, {role_id: UserRoleEnum.STUDENT});

            res.end();
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
