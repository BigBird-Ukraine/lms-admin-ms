import { Router } from 'express';

import { groupController } from '../../controllers';
import {checkAccessTokenMiddleware, checkIsAdmin} from '../../middleware';

const router = Router();

router.get('/', groupController.getAllGroups);

router.use(checkAccessTokenMiddleware, checkIsAdmin);

router.post('/', groupController.createGroup);

export const groupRouter = router;
