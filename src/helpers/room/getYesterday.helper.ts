export const getYesterday = (date: Date) => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday;
};
