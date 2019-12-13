import { Router } from 'express';

import { authController } from '../../controllers';
import {
    checkAccessTokenMiddleware,
    checkIsAdmin,
    checkIsPasswordCorrect,
    checkIsUserRegistered,
    checkRefreshTokenMiddleware
} from '../../middleware';

const router = Router();

router.post('/', checkIsUserRegistered, checkIsAdmin, checkIsPasswordCorrect, authController.loginUser);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware , authController.refreshToken);

export const authRouter = router;
