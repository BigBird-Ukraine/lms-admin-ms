import { Router } from 'express';

import { userController } from '../../controllers';
import { checkIsEmailPresent } from '../../middleware/auth';
import { isUserPresent } from '../../middleware/user';

const router = Router();

router.get('/', userController.getAll);
router.get('/all', userController.getAllByRole);
router.get('/getInfo', userController.getUserInfoByToken);

router.post('/', checkIsEmailPresent, userController.createUser);

router.get('/:user_id', isUserPresent, userController.getByID);
router.patch('/:user_id/block', isUserPresent, userController.blockUser);
router.patch('/:user_id/unBlock', isUserPresent, userController.unBlockUser);
router.patch('/:user_id', isUserPresent, userController.changeRole);
router.delete('/:user_id', isUserPresent, userController.delete);

export const userRouter = router;
