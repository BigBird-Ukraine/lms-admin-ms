import { NextFunction, Response } from 'express';

import { IRequestExtended, IUser } from '../../interfaces';
import { userService } from '../../services/user';

export const updateDate = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const user = req.user as IUser;
  user.updated_at = Date.now().toString();
  await userService.updateUser(user._id, user);
  next();

};
