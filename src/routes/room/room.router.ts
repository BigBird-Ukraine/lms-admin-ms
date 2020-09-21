import { Router } from 'express';

import { roomController } from '../../controllers';
import {
  checkAccessTokenMiddleware, checkDateAndUsersPresentMiddleware,
  isDateValid,
  isRoomOccupiedMiddleware,
  isRoomPresentMiddleware, isRoomUpdatedDataValid,
  isRoomValid, isSettingDateValid, isSettingRoomValid
} from '../../middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', roomController.getRooms);
router.post('/', isRoomValid, isDateValid, isRoomOccupiedMiddleware, roomController.createRoom);

router.get('/my', roomController.getMyRooms);

router.post('/setting', isSettingRoomValid, isSettingDateValid, roomController.createSettingRoom);
router.get('/setting', roomController.getSettingRooms);

router.use('/:room_id', isRoomPresentMiddleware);
router.get('/:room_id', roomController.getSingleRoom);
router.put('/:room_id', isRoomUpdatedDataValid, checkDateAndUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', roomController.deleteRoom);

export const roomRouter = router;
