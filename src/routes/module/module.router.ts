import { Router } from 'express';

import { moduleController } from '../../controllers';
import {  checkIsAdmin } from '../../middleware';

const router = Router();

router.use(  checkIsAdmin );

router.post('/', moduleController.createModule);

export const moduleRouter = router;
