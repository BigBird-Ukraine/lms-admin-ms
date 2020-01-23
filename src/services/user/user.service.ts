import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { User, UserSchema, UserType } from '../../database';
import { IUser, IUserSubject } from '../../interfaces';

class UserService {
  async createUser(userValue: IUser): Promise<any> {
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
    return UserModel.findByIdAndDelete(user_id) as any;
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
}

export const userService = new UserService();
