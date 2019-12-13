import { model } from 'mongoose';
import { UserStatusEnum } from '../../constants/enums';
import { User, UserSchema, UserType } from '../../database';
import { IUser } from '../../interfaces';

class UserService {
    async createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }

    async getUserByParams(params: Partial<IUser>): Promise<any> {
        const UserModel = model<UserType>('User', UserSchema);

        return UserModel.findOne(params);
    }

    async blockUnBlockUser(user_id: string): Promise<any> {
        const UserModel = model<UserType>('User', UserSchema);
        return UserModel.findById(user_id, (err: any, doc: UserType) => {
            if (!err) {
                if (doc.status_id === UserStatusEnum.ACTIVE) {
                    doc.status_id = UserStatusEnum.BLOCKED;
                } else if (doc.status_id === UserStatusEnum.BLOCKED) {
                    doc.status_id = UserStatusEnum.ACTIVE;
                }
                console.log(doc.status_id);
                doc.save();
            }
        });
    }

    async changeRole(user_id: string, role: number): Promise<any> {
        const UserModel = model<UserType>('User', UserSchema);
        return UserModel.findById(user_id, (err, doc: UserType) => {
            if (!err) {
                doc.role_id = role;
                doc.save();
            }
        });
    }
}

export const userService = new UserService();
