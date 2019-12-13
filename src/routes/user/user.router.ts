import { Router } from 'express';

import { userController } from '../../controllers';

const router = Router();

router.post('/', userController.createUser);
router.get('/getInfo', userController.getUserInfoByToken);
router.post('/:user_id/block', userController.blockUnBlockUser);

export const userRouter = router;
