import { Router } from 'express';
import { authController } from '../../controllers/';
import { checkIsUserRegistered } from '../../middleware/auth';

const router = Router();

router.post('/', checkIsUserRegistered, authController.loginUser);

export const authRouter = router;
