import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { UploadedFile } from 'express-fileupload';
import { ResponseStatusCodesEnum, UserRoleEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD, userPhotoMv } from '../../helpers';
import { IRequestExtended, ITestResultModel, IUser, IUserSubject } from '../../interfaces';
import { groupService, userService } from '../../services';
import { adminPatchUserValidator, userFilterValidator } from '../../validators';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const appRoot = (global as any).appRoot;
    const [userPhoto] = req.photos as UploadedFile[];

    user.password = await HASH_PASSWORD(user.password);
    const registeredUser = await userService.createUser(user);

    if (userPhoto) {
      const {photoDir, photoName, _id} = await userPhotoMv(registeredUser, userPhoto, appRoot);
      await userService.updateUser(_id, {photo_path: `${photoDir}/${photoName}`});
    }

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {

    const user = req.user as IUser;

    res.json(user);
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
    const updateValidity = Joi.validate(updateInfo, adminPatchUserValidator);

    if (updateValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, updateValidity.error.details[0].message));
    }

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

    const filterValidity = Joi.validate(filterParams, userFilterValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    for (const filterParamsKey in filterParams) {
      if (filterParamsKey !== 'role_id') {
        filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
      }
    }

    const users = await userService.getAll(_id, filterParams, +pageSize, offset, order) as IUserSubject[];
    for (const user of users) {
      user.groups_id = await groupService.getAllGroupsByUserId(user._id);
    }
    const count = await userService.getSizeOfAll(_id, filterParams) as number;
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

  async addTestResult(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const passed_test = req.passed_test as ITestResultModel;

    await userService.addPassedTest(_id, passed_test);
    const user = await userService.getByID(_id);

    res.json({data: user});
  }
}

export const userController = new UserController();
