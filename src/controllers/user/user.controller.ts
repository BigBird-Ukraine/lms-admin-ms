import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

import {ResponseStatusCodesEnum, UserRoleEnum, UserStatusEnum} from '../../constants';
import {ErrorHandler, errors} from '../../errors';
import {HASH_PASSWORD} from '../../helpers';
import {IRequestExtended, IUser, IUserSubjectModel} from '../../interfaces';
import {userService} from '../../services';
import {registerDataValidator} from '../../validators';

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
            const result: IUserSubjectModel = {
                _id,
                email,
                name,
                surname,
                role_id,
                status_id,
                photo_path,
                groups_id
            };
            res.json(result);
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

    async changeRoleToAdmin(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeRole(user_id, UserRoleEnum.ADMIN);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async changeRoleToTeacher(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeRole(user_id, UserRoleEnum.TEACHER);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async changeRoleToStudent(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            await userService.changeRole(user_id, UserRoleEnum.STUDENT);
            res.end();
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
            const result = await userService.getAll(_id) as [IUser];

            if (!result) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getByID(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {user_id} = req.params;
            const result = await userService.getByID(user_id) as IUser;

            if (!result) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(result);

        } catch (e) {
            next(e);
        }
    }

    async getAllAdmins(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {_id} = req.user as IUser;
            const result = await userService.getAllByRole(UserRoleEnum.ADMIN, _id);

            if (!result) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getAllTeachers(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const result = await userService.getAllByRole(UserRoleEnum.TEACHER);

            if (!result) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getAllStudents(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const result = await userService.getAllByRole(UserRoleEnum.STUDENT);

            if (!result) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
