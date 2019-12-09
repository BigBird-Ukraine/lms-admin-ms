import { Router } from 'express';

import { authController } from '../../controllers';
import {
    checkIsAdmin,
    checkIsPasswordCorrect,
    checkIsUserRegistered,
    checkRefreshTokenMiddleware
} from '../../middleware';

const router = Router();

router.post('/', checkIsUserRegistered, checkIsPasswordCorrect, checkIsAdmin, authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware , authController.refreshToken);

export const authRouter = router;
