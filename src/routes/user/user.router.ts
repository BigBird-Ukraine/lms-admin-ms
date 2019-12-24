import { Router } from 'express';

import { userController } from '../../controllers';
import {checkIsEmailPresent, isUserBlocked, isUserPresent, updateDate} from '../../middleware';

const router = Router();

router.get('/', userController.getAll);
router.get('/getInfo', userController.getUserInfoByToken);

router.post('/', checkIsEmailPresent, userController.createUser);

router.use('/:user_id', isUserPresent);
router.delete('/:user_id', userController.delete);

router.use(updateDate);
router.get('/:user_id', userController.getByID);
router.post('/:user_id/block', userController.blockUser);
router.post('/:user_id/unblock', userController.unBlockUser);
router.post('/:user_id/teacher', isUserBlocked, userController.makeUserTeacher);
router.post('/:user_id/admin', isUserBlocked, userController.makeUserAdmin);
router.post('/:user_id/student', isUserBlocked, userController.makeUserStudent);
router.patch('/:user_id', userController.updateUserByID);

export const userRouter = router;
