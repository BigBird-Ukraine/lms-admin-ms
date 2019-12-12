import { model } from 'mongoose';
import { User, UserSchema, UserType } from '../../database';
import { IUser } from '../../Interfaces';

class UserService {
    createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }
    getUserByParams(params: Partial<IUser>) {
        const UserModel = model<UserType>('User', UserSchema);

        return UserModel.findOne(params);
    }
}

export const userService = new UserService();
