import { Router } from 'express';

import { RouterActionsEnum } from '../../constants/enums';
import { roomController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkUsersPresentMiddleware,
  isDateValid,
  isRoomOccupiedMiddleware,
  isRoomPresentMiddlewareWrapper,
  isRoomUpdatedDataValid,
  isRoomValid,
  isSettingDateValid,
  isSettingRoomExist,
  isSettingRoomPresentMiddleware,
  isSettingRoomValid
} from '../../middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', roomController.getRooms);
router.post('/', isRoomValid, isDateValid, isRoomOccupiedMiddleware, roomController.createRoom);

router.post('/setting', isSettingRoomValid, isSettingDateValid, isSettingRoomExist, roomController.createSettingRoom);
router.get('/setting', roomController.getSettingRooms);
router.delete('/setting/:id', isSettingRoomPresentMiddleware, roomController.deleteSettingRoom);

router.use('/:room_id', isRoomPresentMiddlewareWrapper(null));
router.get('/:room_id', roomController.getSingleRoom);
router.put('/:room_id', isRoomUpdatedDataValid, checkUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', roomController.deleteRoom);

router.get('/:room_id/:table_number',
  isRoomPresentMiddlewareWrapper(RouterActionsEnum.FIND_ROOM_WITH_BOOKING_TABLE),
  roomController.getBookTable);
router.delete('/:room_id/:table_id', isRoomPresentMiddlewareWrapper(null), roomController.deleteBooking);

export const roomRouter = router;
