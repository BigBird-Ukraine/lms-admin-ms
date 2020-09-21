import { IRoom } from '../../interfaces';

export const checkDateExist = (rooms: IRoom[], currentS: Date, currentE: Date) => {
    const current_start = new Date(currentS).getTime();
    const current_end = new Date(currentE).getTime();

    let existStatus = false;

    rooms.forEach(({start_at, close_at}) => {
        const startAt = new Date(start_at).getTime();
        const closeAt = new Date(close_at).getTime();

        if (current_end < closeAt && current_end > startAt) {
            existStatus = true;
        }

        if (current_start < closeAt && current_start > startAt ) {
            existStatus = true;
        }

        if (current_end >= closeAt && current_start <= startAt) {
            existStatus = true;
        }
    });

    return existStatus;
};
