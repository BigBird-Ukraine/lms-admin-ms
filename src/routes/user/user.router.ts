import { Router } from 'express';

import { userController } from '../../controllers';
import {checkIsEmailPresent} from "../../middleware/auth";

const router = Router();

router.get('/', userController.getAll);
router.get('/allAdmins', userController.getAllAdmins);
router.get('/allTeachers', userController.getAllTeachers);
router.get('/allStudents', userController.getAllStudents);
router.get('/getInfo', userController.getUserInfoByToken);
router.get('/:user_id', userController.getByID);

router.post('/',checkIsEmailPresent, userController.createUser);

router.patch('/:user_id/block', userController.blockUser);
router.patch('/:user_id/unBlock', userController.unBlockUser);
router.patch('/:user_id/admin', userController.changeRoleToAdmin);
router.patch('/:user_id/teacher', userController.changeRoleToTeacher);
router.patch('/:user_id/student', userController.changeRoleToStudent);

router.delete('/:user_id', userController.delete);

export const userRouter = router;
