import { model } from 'mongoose';
import { User, UserSchema, UserType } from '../../database';
import { IUser } from '../../interfaces';

class UserService {
    async createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }

    async getUserByParams(params: Partial<IUser>) {
        const UserModel = model<UserType>('User', UserSchema);

        return UserModel.findOne(params);
    }

    async blockUnBlockUser(id: string) {
        const UserModel = model<UserType>('User', UserSchema);
        return UserModel.findById(id, (err: any, doc: UserType) => {
            if (!err) {
               if (doc.status_id === UserStatusEnum.ACTIVE){
                   doc.status_id = UserStatusEnum.BLOCKED;
               }

                if (doc.status_id === UserStatusEnum.BLOCKED){
                    doc.status_id = UserStatusEnum.ACTIVE;
                }

                doc.save();
            }
        });
    }
}

export const userService = new UserService();
