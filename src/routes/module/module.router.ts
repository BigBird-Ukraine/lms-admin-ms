import { Router } from 'express';

import { moduleController } from '../../controllers';
import { isModulePresent } from '../../middleware';

const router = Router();

router.post('/', moduleController.createModule);

router.get('/', moduleController.getAllModules);
router.get('/:module_id', isModulePresent, moduleController.getModuleById);

router.patch('/:module_id', isModulePresent, moduleController.editModule);

router.delete('/:module_id', isModulePresent, moduleController.deleteModule);

export const moduleRouter = router;
