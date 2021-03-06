import { Router } from 'express';

import { groupController } from '../../controllers';
import { isGroupAttendanceValid, isGroupPresent, isVisitLogPresent } from '../../middleware/group';

const router = Router();

router.get('/', groupController.getAllGroups);
router.get('/statics', groupController.getStatics);
router.get('/by_course', groupController.getGroupsByCourseId);

router.post('/', groupController.createGroup);

router.use('/:group_id', isGroupPresent);
router.delete('/:group_id', groupController.delete);
router.get('/:group_id', groupController.getGroupById);
router.post('/:group_id', groupController.editGroupById);
router.patch('/:group_id', groupController.changeUserListById);

router.post('/:group_id/attendance', isGroupAttendanceValid, groupController.addNewVisitLog);
router.delete('/:group_id/attendance', isVisitLogPresent, groupController.deleteVisitLog);
router.patch('/:group_id/attendance', isVisitLogPresent, groupController.editVisitLog);

export const groupRouter = router;
