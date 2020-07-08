import { Router } from 'express';

import { moduleController } from '../../controllers';
import { isModulePresent } from '../../middleware';
import { isModuleFilterValid, isModuleValid } from '../../middleware/module/validators';

const router = Router();

router.post('/', isModuleValid, moduleController.createModule);
router.get('/', isModuleFilterValid, moduleController.getModules);

router.use('/:module_id', isModulePresent);
router.get('/:module_id', moduleController.getModuleById);
router.patch('/:module_id', moduleController.editModule);
router.delete('/:module_id', moduleController.deleteModule);

export const moduleRouter = router;
