import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import {IRequestExtended, IRoom, ISettingRoom, IUser} from '../../interfaces';
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

    res.json(room);
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

  async createSettingRoom(req: IRequestExtended, res: Response, next: NextFunction) {
    const room = req.body as ISettingRoom;

    await roomService.createSettingRoom(room);

    res.json(ResponseStatusCodesEnum.CREATED);
  }

  async getSettingRooms(req: IRequestExtended, res: Response, next: NextFunction) {
    const {...filter} = req.query;

    const rooms = await roomService.findSettingRooms(filter);

    res.json(rooms);
  }
}

export const roomController = new RoomController();
