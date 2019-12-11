import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { userService } from '../../services';
import { registerDataValidator } from '../../validators';
import { IRequestExtended } from '../../Interfaces';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;

            const userValidity = Joi.validate(user, registerDataValidator);

            if (userValidity.error) {
                return next( new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
            }

            user.password = await HASH_PASSWORD(user.password);

            await userService.createUser(user);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.end();
        } catch (e) {
            next(e);
        }
    }
    async getInfo(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id: { _id, name, group, photo_path, role, status, surname, email } } = req.user;
            const user = {
                _id,
                email,
                name,
                surname,
                group,
                photo_path,
                role_id: role,
                status_id: status
            };
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
