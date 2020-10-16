import { Router } from 'express';

import { apiController } from '../../controllers/apis';
import { isApiExist, isApiPresent, isApiValidMiddleware } from '../../middleware/apis';
import { checkAccessTokenMiddleware, checkIsAdmin } from '../../middleware/auth';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsAdmin);

router.post('/', isApiValidMiddleware, isApiExist, apiController.createApi);
router.get('/', apiController.getApis);
router.delete('/', isApiPresent, apiController.deleteApi);

export const apisRouter = router;
