import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
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
            const { _id, email, name, surname, role_id, status_id, photo_path, groups_id } = req.user as IUser;
            const user: IUserSubjectModel = {
                _id,
                email,
                name,
                surname,
                role_id,
                status_id,
                photo_path,
                groups_id
            };
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async blockUnBlockUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.params;
            await userService.blockUnBlockUser(user_id);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async changeRole(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.params;
            const { role_id } = req.body;
            await userService.changeRole(user_id, role_id);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.params;
            await userService.delete(user_id);
            res.end();
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user as IUser;
            const gettingAll = await userService.getAll(_id) as [IUser];

            if (!gettingAll) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(gettingAll);
        } catch (e) {
            next(e);
        }
    }

    async getByID(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.params;
            const gettingUser = await userService.getByID(user_id) as IUser;

            if (!gettingUser) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_USER_NOT_PRESENT.message,
                    errors.NOT_FOUND_USER_NOT_PRESENT.code
                ));
            }

            res.json(gettingUser);

        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
