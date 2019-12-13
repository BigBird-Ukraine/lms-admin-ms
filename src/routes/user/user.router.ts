import { Router } from 'express';

import { userController } from '../../controllers';
import { checkAccessTokenMiddleware } from '../../middleware/auth';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.post('/', userController.createUser);
router.get('/getInfo', userController.getUserInfoByToken);
router.post('/:user_id/block', userController.blockUnLockUser);

export const userRouter = router;
