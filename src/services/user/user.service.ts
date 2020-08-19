import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Group, Lesson, OauthToken, User, UserSchema, UserType } from '../../database';
import { IUser, IUserSubject } from '../../interfaces';

class UserService {
  createUser(userValue: Partial<IUser>): Promise<any> {
    const newUser = new User(userValue);

    return newUser.save();
  }

  getUserByParams(params: Partial<IUser>): Promise<IUser> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findOne(params).select('+password') as any;
  }

  changeStatus(user_id: string, status_id: number): Promise<void> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findByIdAndUpdate(user_id, {status_id}) as any;
  }

  updateUser(user_id: string, patchObject: Partial<IUser>): Promise<void> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findByIdAndUpdate(user_id, patchObject, {new: true}) as any;
  }

  delete(user_id: string): Promise<void> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findByIdAndDelete(user_id, (err) => {
      Group.update(
        { users_list: user_id },
        { $pull: { users_list: user_id } },
        { multi: true })
        .exec();

      Lesson.update(
        { user_id },
        { $set: { user_id: null } })
        .exec();

      OauthToken.update(
        { user_id },
        { $set: { user_id: null } })
        .exec();
    }) as any;
  }

  getAll(myId: string, filterParams: Partial<IUser>, limit: number, skip: number, order: string): Promise<IUserSubject[]> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel
      .find({...filterParams, _id: {$ne: myId}})
      .limit(limit)
      .skip(skip)
      .sort(order)
      .select({password: 0}) as any;
  }

  getSizeOfAll(myId: string, filterParams: Partial<IUser>): Promise<number> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel
      .countDocuments({...filterParams, _id: {$ne: myId}}) as any;
  }

  getByID(user_id: string): Promise<IUser> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel
      .findById(user_id)
      .select({password: 0}) as any;
  }

  deleteGroupOfUser(users_id: string[], group_id: string): Promise<any> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.bulkWrite(users_id.map(user_id => {
      return {
        updateOne: {
          filter: {_id: user_id},
          update: {
            $pull: {groups_id: group_id}
          },
          upsert: true
        }
      };
    }));
  }

  addGroupInUser(users_id: string[], group_id: string): Promise<any> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.bulkWrite(users_id.map(user_id => {
      return {
        updateOne: {
          filter: {_id: user_id},
          update: {
            $addToSet: {groups_id: group_id}
          },
          upsert: true
        }
      };
    }));
  }

  async getStatistics() {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    const activeUser = await UserModel.countDocuments({
      status_id: 1
    });

    const blockedUser = await UserModel.countDocuments({
      status_id: 2
    });

    return {
      activeUser,
      blockedUser
    };
  }

  async getUsersByStatus(status: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.find({status_id: status})
      .select({name: 1, surname: 1, phone_number: 1, email: 1});
  }
}

export const userService = new UserService();
