import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IGroup, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services/group';

export const isGroupPresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const {group_id} = req.params;
  const group = await groupService.getById(group_id) as IGroup;

  if (!group) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_GROUP_NOT_PRESENT.message,
      errors.NOT_FOUND_GROUP_NOT_PRESENT.code
    ));
  }
  req.group = group;
  next();
};
