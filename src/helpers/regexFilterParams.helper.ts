export const regexFilterParams = (filterParams: any) => {
    for (const filterParamsKey in filterParams) {
        if (filterParamsKey) {
            filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
        }
    }

    return filterParams;
};
