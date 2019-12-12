import { Router } from 'express';

import { groupController } from '../../controllers';

const router = Router();

router.get('/', groupController.getAllGroups);

router.post('/', groupController.createGroup);

export const groupRouter = router;
