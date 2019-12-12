import { Router } from 'express';

import { moduleController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsAdmin } from '../../middleware';

const router = Router();

router.use( checkAccessTokenMiddleware, checkIsAdmin );

router.post('/', moduleController.createModule);

export const moduleRouter = router;
