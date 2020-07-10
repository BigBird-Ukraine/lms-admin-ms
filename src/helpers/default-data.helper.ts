import { UserRoleEnum, UserStatusEnum } from '../constants';
import { userService } from '../services';

export const setDefaultData = async () => {
  const admin = await userService.getUserByParams({role_id: UserRoleEnum.ADMIN});

  if (!admin) {
    await userService.createUser({
      name: 'Admin',
      surname: 'Service',
      email: 'super.admin@lms.com',
      password: '$2b$10$/5EwIHiZB2c1DO41efl/h.uVQUDT/GccqwWL80KeyCpFFaQf98nXW', // Password1!
      role_id: UserRoleEnum.ADMIN,
      status_id: UserStatusEnum.ACTIVE
    });
  }
};
