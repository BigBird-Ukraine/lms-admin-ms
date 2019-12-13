import { Router } from 'express';

import { moduleController } from '../../controllers';

const router = Router();

router.post('/', moduleController.createModule);

router.get('/', moduleController.getAllModules);
router.get('/:module_id', moduleController.getModuleById);

router.patch('/:module_id', moduleController.editModule);

router.delete('/:module_id', moduleController.deleteModule);

export const moduleRouter = router;
