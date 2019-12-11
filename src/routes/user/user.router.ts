import { Router } from 'express';

import { userController } from '../../controllers';

const router = Router();

router.post('/', userController.createUser);
router.get('/getInfo', userController.getInfo);
router.post('/:user_id/block', userController.blockUser);

export const userRouter = router;
