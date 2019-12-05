import { Router } from 'express';

import { userController } from '../../controllers';

const router = Router();

router.post('/', userController.createUser);
router.post('/:user_id/block', userController.blockUser);

export const userRouter = router;
