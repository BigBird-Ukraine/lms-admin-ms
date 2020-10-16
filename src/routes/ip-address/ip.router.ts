import { Router } from 'express';

import { ipController } from '../../controllers/ip';
import { checkAccessTokenMiddleware, checkIsAdmin } from '../../middleware/auth';
import { isIpExist, isIpPresent, isIpValidMiddleware } from '../../middleware/ip';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsAdmin);

router.post('/', isIpValidMiddleware, isIpExist, ipController.createIp);
router.get('/', ipController.getIp);
router.delete('/', isIpPresent, ipController.deleteIp);

export const ipRouter = router;
