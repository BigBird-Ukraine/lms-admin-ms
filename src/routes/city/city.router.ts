import { Router } from 'express';

import { cityController } from '../../controllers/city';
import { checkAccessTokenMiddleware, checkIsAdmin } from '../../middleware/auth';
import { isCityPresent, isCityValidMiddleware } from '../../middleware/city';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsAdmin);

router.post('/', isCityValidMiddleware,  cityController.createCity);
router.get('/', cityController.getCities);
router.delete('/', isCityPresent,  cityController.deleteCity);

export const cityRouter = router;
