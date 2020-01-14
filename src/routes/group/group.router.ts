import {Router} from 'express';

import {groupController} from '../../controllers';
import {isGroupPresent, updateGroupDate} from '../../middleware/group';

const router = Router();

router.get('/', groupController.getAllGroups);

router.post('/', groupController.createGroup);

router.use('/:group_id', isGroupPresent);
router.delete('/:group_id', groupController.delete);
router.get('/:group_id', groupController.getGroupById);

router.use(updateGroupDate);
router.patch('/:group_id', groupController.changeUserListById);
router.post('/:group_id', groupController.editGroupById);

export const groupRouter = router;
