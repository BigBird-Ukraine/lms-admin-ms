import { Router } from 'express';

import { moduleController } from '../../controllers';
import { isModulePresent } from '../../middleware';

const router = Router();

router.post('/', moduleController.createModule);
router.get('/', moduleController.getModules);

router.get('/statics', moduleController.getStatics);
router.get('/by_course', moduleController.getModulesByCourseId);

router.get('/all-cropped', moduleController.getCroppedModules);

router.use('/:module_id', isModulePresent);
router.get('/:module_id', moduleController.getModuleById);
router.patch('/:module_id', moduleController.editModule);
router.delete('/:module_id', moduleController.deleteModule);

export const moduleRouter = router;
