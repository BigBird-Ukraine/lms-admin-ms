export const regexFilterWithoutRoleParams = (filterParams: any) => {
    for (const filterParamsKey in filterParams) {
        if (filterParamsKey !== 'role_id') {
            filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
        }
    }

    return filterParams;
};
