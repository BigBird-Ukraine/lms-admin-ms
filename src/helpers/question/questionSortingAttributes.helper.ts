import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IQuestion } from '../../interfaces';

export const questionSortingAttributes = (sort: keyof IQuestion) => {
    const sortingAttributes: Array<keyof IQuestion> = ['group', 'level', 'subject', 'tags', '_id'];

    if (!sortingAttributes.includes(sort)) {
        throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'Cant sort by this param');
    }

};
