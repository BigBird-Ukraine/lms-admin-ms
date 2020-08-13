import { Router } from 'express';

import { userController } from '../../controllers';
import {
  checkIsEmailPresent, checkNumberOfUserPhoto,
  isUserBlocked,
  isUserPresent, isUserValid, photoCheckMiddleware,
  updateDate
} from '../../middleware';

const router = Router();

router.get('/', userController.getAll);
router.get('/getInfo', userController.getUserInfoByToken);

router.get('/statics', userController.getUserStatistics);
router.get('/by_status', userController.getUsersByStatus);

router.post('/', isUserValid, checkIsEmailPresent, photoCheckMiddleware, checkNumberOfUserPhoto, userController.createUser);

router.use('/:user_id', isUserPresent);
router.delete('/:user_id', userController.delete);

router.get('/:user_id', userController.getByID);

router.use(updateDate);
router.post('/:user_id/block', userController.blockUser);
router.post('/:user_id/unblock', userController.unBlockUser);
router.post('/:user_id/teacher', isUserBlocked, userController.makeUserTeacher);
router.post('/:user_id/admin', isUserBlocked, userController.makeUserAdmin);
router.post('/:user_id/student', isUserBlocked, userController.makeUserStudent);
router.patch('/:user_id', userController.updateUserByID);

export const userRouter = router;
