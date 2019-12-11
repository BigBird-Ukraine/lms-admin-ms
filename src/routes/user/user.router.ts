import { Router } from 'express';

import { userController } from '../../controllers';
import {checkAccessTokenMiddleware} from "../../middleware";

const router = Router();

router.use(checkAccessTokenMiddleware);
router.post('/', userController.createUser);
router.post('/:user_id/block', userController.blockUser);

export const userRouter = router;
