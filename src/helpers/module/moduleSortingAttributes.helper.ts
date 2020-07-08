import { ResponseStatusCodesEnum, StatusesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IModule } from '../../interfaces';

export const moduleSortingAttributes = (sort: keyof IModule) => {
    const sortingAttributes: Array<keyof IModule> = ['_id', 'label', 'tags', 'courses_id', 'lessons'];

    if (!sortingAttributes.includes(sort)) {
        throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.CANT_SORT_BY_THIS_PARAM);
    }
};
