import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { User, UserSchema, UserType } from '../../database';
import { IUser } from '../../interfaces';

class UserService {
    async createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }

    async getUserByParams(params: Partial<IUser>): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findOne(params);
    }

    async changeStatus(user_id: string, status: number): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndUpdate(user_id, { status_id: status });
    }

    async changeRole(user_id: string, role: number): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndUpdate(user_id, { role_id: role });
    }

    async delete(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndDelete(user_id);
    }

    async getAll(myId: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.find({ _id: { $ne: myId } });
    }

    async getByID(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findById(user_id);
    }

    async getAllByRole(status: number, myId?: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.find({ role_id: status, _id: { $ne: myId } });
    }
}

export const userService = new UserService();
