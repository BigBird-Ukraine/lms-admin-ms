import { Router } from 'express';

import { groupController } from '../../controllers';
// import { checkIsAdmin } from '../../middleware';

const router = Router();

router.get('/', groupController.getAllGroups);

// router.use(checkIsAdmin);
router.post('/', groupController.createGroup);

export const groupRouter = router;
