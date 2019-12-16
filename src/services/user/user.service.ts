import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { User, UserSchema, UserType } from '../../database';
import { IUser } from '../../interfaces';

class UserService {
    async createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }

    getUserByParams(params: Partial<IUser>): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findOne(params) as any;
    }

    changeStatus(user_id: string, status: number): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndUpdate(user_id, { status_id: status }) as any;
    }

    changeRole(user_id: string, role: number): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndUpdate(user_id, { role_id: role }) as any;
    }

    delete(user_id: string): Promise<void> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findByIdAndDelete(user_id) as any;
    }

    getAll(myId: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.find({ _id: { $ne: myId } }) as any;
    }

    getByID(user_id: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.findById(user_id) as any;
    }

    getAllByRole(role: number, myId?: string): Promise<any> {
        const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);
        return UserModel.find({ role_id: role, _id: { $ne: myId } }) as any;
    }
}

export const userService = new UserService();
