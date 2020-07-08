import { Router } from 'express';

import { userController } from '../../controllers';
import { checkIsEmailPresent, isAdminPatchUserValid, isUserBlocked, isUserPresent, isUserValid, updateDate } from '../../middleware';
import { isUserFilterValid } from '../../middleware/user/validators/isUserFilterValid.middleware';

const router = Router();

router.get('/', isUserFilterValid, userController.getAll);
router.get('/getInfo', userController.getUserInfoByToken);

router.post('/', isUserValid, checkIsEmailPresent, userController.createUser);

router.use('/:user_id', isUserPresent);
router.delete('/:user_id', userController.delete);

router.get('/:user_id', userController.getByID);

router.use(updateDate);
router.post('/:user_id/block', userController.blockUser);
router.post('/:user_id/unblock', userController.unBlockUser);
router.post('/:user_id/teacher', isUserBlocked, userController.makeUserTeacher);
router.post('/:user_id/admin', isUserBlocked, userController.makeUserAdmin);
router.post('/:user_id/student', isUserBlocked, userController.makeUserStudent);
router.patch('/:user_id', isAdminPatchUserValid, userController.updateUserByID);

export const userRouter = router;
