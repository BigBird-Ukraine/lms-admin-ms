import { Router } from 'express';

import { groupController } from '../../controllers';
import { isEditedGroupValid, isGroupFilterValid, isGroupPresent, isGroupValid } from '../../middleware';
import { isUpdatedGroupValid } from '../../middleware/group/validators/isUpdatedGroupValid.middleware';

const router = Router();

router.get('/', isGroupFilterValid, groupController.getAllGroups);

router.post('/', isGroupValid, groupController.createGroup);

router.use('/:group_id', isGroupPresent);
router.delete('/:group_id', groupController.delete);
router.get('/:group_id', groupController.getGroupById);
router.post('/:group_id', isEditedGroupValid, groupController.editGroupById);
router.patch('/:group_id', isUpdatedGroupValid, groupController.changeUserListById);

export const groupRouter = router;
