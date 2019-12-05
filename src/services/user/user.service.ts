
import { User } from '../../database';
import { IUser } from '../../Interfaces';

class UserService {
    createUser(userValue: IUser): Promise<any> {
        const newUser = new User(userValue);
        return newUser.save();
    }
}

export const userService = new UserService();
