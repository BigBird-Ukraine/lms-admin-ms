import { ICutRoom, IRoom } from '../../interfaces';

export const countFreePlaces = (room: IRoom) => {
  const {_id, label, description, start_at, close_at, city, count_all_places, booked_users} = room;

  const numbersPlaces = Array.from({length: count_all_places}, (_, i) => i + 1);

  const idPlaces: number[] = [];
  let countBookedPlaces = 0;

  numbersPlaces.forEach((table: number) => {
    const iBookUser = booked_users.find(b => b.table_number === table);
    if (iBookUser) {
      countBookedPlaces++;
      idPlaces.push(table);
    }
  });

  const cutRoom: ICutRoom = {_id, label, description, start_at, close_at, city, count_all_places};

  return {...cutRoom, countBookedPlaces, numbersPlaces, idPlaces};
};
