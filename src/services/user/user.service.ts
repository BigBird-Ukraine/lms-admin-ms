import { model } from 'mongoose';

import { DatabaseTablesEnum, UserStatusEnum } from '../../constants/enums';
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

    async blockUnBlockUser(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findById(user_id, (err: any, doc: UserType) => {
            if (!err) {
                if (doc.status_id === UserStatusEnum.ACTIVE || doc.status_id === UserStatusEnum.BLOCKED) {
                    doc.status_id = (doc.status_id === UserStatusEnum.ACTIVE) ? UserStatusEnum.BLOCKED : UserStatusEnum.ACTIVE;
                doc.save();
                }
            }
        });
    }

    async changeRole(user_id: string, role: number): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findById(user_id, (err, doc: UserType) => {
            if (!err) {
                doc.role_id = role;
                doc.save();
            }
        });
    }

    async delete(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndDelete(user_id);
    }

    async getAll(_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.find({ _id: { $ne: _id } });
    }

    async getByID(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findById(user_id);
    }
}

export const userService = new UserService();
