import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Room, RoomSchema, RoomType, SettingRoom, SettingRoomScheme, SettingRoomType } from '../../database/models';
import { IRoom, ISettingRoom } from '../../interfaces';

class RoomService {

  createRoom(room: IRoom): Promise<any> {
    const newRoom = new Room(room);

    return newRoom.save();
  }

  findRooms(filter?: any): Promise<IRoom[]> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    return RoomModel.find(filter)
      .populate({
        path: 'groups',
        select: {label: 1, _id: 0}
      }) as any;
  }

  findRoomsWithBookingTable(roomId: string): Promise<IRoom[]> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);
    const currentDate = new Date();

    return RoomModel.find({
      _id: roomId,
      close_at: {
        $gt: currentDate
      }
    }).populate({
      path: 'booked_users',
      select: {user_id: 1},
      populate: {
        path: 'user_id',
        select: {name: 1, surname: 1}
      }
    }).select({booked_users: 1}) as any;
  }

  updateRoom(room_id: string, room: Partial<IRoom>): Promise<IRoom> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    return RoomModel.findByIdAndUpdate(room_id, room, {new: true}) as any;
  }

  async deleteRoom(room_id: string): Promise<void> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    await RoomModel.findByIdAndDelete(room_id);
  }

  createSettingRoom(room: ISettingRoom): Promise<any> {
    const newSettingRoom = new SettingRoom(room);

    return newSettingRoom.save();
  }

  findSettingRooms(filter?: any, select?: any): Promise<ISettingRoom[]> {
    const SettingRoomModel = model<SettingRoomType>(DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME, SettingRoomScheme);

    return SettingRoomModel.find(filter).select(select) as any;
  }

  async deleteSettingRoom(room_id: string): Promise<void> {
    const SettingRoomModel = model<SettingRoomType>(DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME, SettingRoomScheme);

    await SettingRoomModel.findByIdAndDelete(room_id);
  }

  async deleteBooking(room_id: string, _id: string, rent_start: string) {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    await RoomModel.findByIdAndUpdate(room_id, {
      $pull: {
        booked_users: {
          rent_start,
          _id
        }
      }
    });
  }
}

export const roomService = new RoomService();
