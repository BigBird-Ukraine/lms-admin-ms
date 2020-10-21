import { IRoom } from '../../interfaces';

export const getBookTables = (room: IRoom, number_table: string) => {
   return room.booked_users.filter(bk => bk.table_number === +number_table);
};
