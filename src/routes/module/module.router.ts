import { Router } from 'express';

import { moduleController } from '../../controllers';

const router = Router();

router.post('/', moduleController.createModule);

export const moduleRouter = router;
