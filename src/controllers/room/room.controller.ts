import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { countFreePlaces, getBookTables } from '../../helpers';
import { ICutRoom, IRequestExtended, IRoom, ISettingRoom, IUser } from '../../interfaces';
import { roomService } from '../../services';

class RoomController {

  async getRooms(req: IRequestExtended, res: Response, next: NextFunction) {
    const {...filter} = req.query;

    const rooms = await roomService.findRooms(filter);

    res.json(rooms);
  }

  async getMyRooms(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;

    const rooms = await roomService.findRooms({owner_id: _id});

    res.json(rooms);
  }

  getSingleRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const room: IRoom = req.room as IRoom;

    const cutRoom: ICutRoom = countFreePlaces(room);

    res.json(cutRoom);
  }

  async createRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const room = req.body as IRoom;
    const {_id} = req.user as IUser;

    await roomService.createRoom({...room, owner_id: _id});

    res.json(ResponseStatusCodesEnum.CREATED);
  }

  async deleteRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const {room_id} = req.params;

    await roomService.deleteRoom(room_id);

    res.json(ResponseStatusCodesEnum.NO_CONTENT);
  }

  async updateRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const {room_id} = req.params;
    const room = req.body as Partial<IRoom>;

    const updatedRoom = await roomService.updateRoom(room_id, room);

    res.json(updatedRoom);
  }

  getBookTable(req: IRequestExtended, res: Response, next: NextFunction) {
    const room = req.room as IRoom;
    const {table_number} = req.params;

    const bookTables = getBookTables(room, table_number);

    res.json(bookTables);
  }

  async createSettingRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const room = req.body as ISettingRoom;

    await roomService.createSettingRoom(room);

    res.json(ResponseStatusCodesEnum.CREATED);
  }

  async getSettingRooms(req: IRequestExtended, res: Response, next: NextFunction) {
    const {select, ...filter} = req.query;

    const rooms = await roomService.findSettingRooms(filter, select && JSON.parse(select));

    res.json(rooms);
  }

  async deleteSettingRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const {id} = req.params;

    await roomService.deleteSettingRoom(id);

    res.json(ResponseStatusCodesEnum.NO_CONTENT);
  }

  async deleteBooking(req: IRequestExtended, res: Response, next: NextFunction) {
    const {table_id, room_id} = req.params;
    const {rentStart} = req.query;

    await roomService.deleteBooking(room_id, table_id, rentStart);

    res.json(ResponseStatusCodesEnum.NO_CONTENT);

  }
}

export const roomController = new RoomController();
