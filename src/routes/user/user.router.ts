import { Router } from 'express';

import { userController } from '../../controllers';

const router = Router();

router.get('/', userController.getAll);
router.get('/getInfo', userController.getUserInfoByToken);
router.get('/:user_id', userController.getByID);

router.post('/', userController.createUser);

router.patch('/:user_id/block', userController.blockUnBlockUser);
router.patch('/:user_id/changeRole', userController.changeRole);

router.delete('/:user_id', userController.delete);

export const userRouter = router;
