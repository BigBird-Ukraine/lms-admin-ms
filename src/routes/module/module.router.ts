import { Router } from 'express';

import { moduleController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsAdmin } from '../../middleware';

const router = Router();

router.use(checkIsAdmin, checkAccessTokenMiddleware);

router.post('/', moduleController.createModule);

export const moduleRouter = router;
