import { Router } from 'express';
import { authController } from '../../controllers/';
import { checkIsAdmin, checkIsPasswordCorrect, checkIsUserRegistered } from '../../middleware/auth';

const router = Router();

router.post('/', checkIsUserRegistered, checkIsPasswordCorrect, checkIsAdmin, authController.loginUser);

export const authRouter = router;
