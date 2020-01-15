import { Router } from 'express';

import { groupController } from '../../controllers';
import { isGroupPresent } from '../../middleware/group';

const router = Router();

router.get('/', groupController.getAllGroups);

router.post('/', groupController.createGroup);

router.use('/:group_id', isGroupPresent);
router.delete('/:group_id', groupController.delete);
router.get('/:group_id', groupController.getGroupById);
router.post('/:group_id', groupController.editGroupById);
router.patch('/:group_id', groupController.changeUserListById);

export const groupRouter = router;
