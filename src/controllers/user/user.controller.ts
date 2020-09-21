import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { GoogleConfigEnum, ResponseStatusCodesEnum, UserRoleEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { googleDeleter, googleUploader, HASH_PASSWORD } from '../../helpers';
import { IRequestExtended, ITestResultModel, IUser, IUserSubject } from '../../interfaces';
import { groupService, userService } from '../../services';
import { adminPatchUserValidator, userFilterValidator } from '../../validators';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    user.password = await HASH_PASSWORD(user.password);
    const id = await userService.createUser(user);

    if (req.files) {
      const {files} = req.files;

      const video_path = await googleUploader(files, GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID, GoogleConfigEnum.PHOTO_GOOGLE_BUCKET_NAME);
      await userService.updateUser(id, {photo_path: `${video_path}`});
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
    const {photo_path} = req.user as IUser;

    await userService.delete(user_id);
    await googleDeleter(
      GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
      GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
      GoogleConfigEnum.PHOTO_GOOGLE_BUCKET_NAME, photo_path as string
    );

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

  getResultPassedTest(req: IRequestExtended, res: Response, next: NextFunction) {
    const passed_test = req.passed_test as ITestResultModel;

    res.json(passed_test.result);
  }

  async getUserStatistics(req: IRequestExtended, res: Response, next: NextFunction) {
    const userStatistics = await userService.getStatistics();

    res.json(userStatistics);
  }

  async getUsersByStatus(req: IRequestExtended, res: Response, next: NextFunction) {
    const activeUsers = await userService.getUsersByStatus(req.query.status);

    res.json(activeUsers);
  }

  async getUserPassedTests(req: IRequestExtended, res: Response, next: NextFunction) {
    const {userId} = req.query;

    const data = await userService.getPassedTests(userId);

    res.json(data);
  }
}

export const userController = new UserController();
