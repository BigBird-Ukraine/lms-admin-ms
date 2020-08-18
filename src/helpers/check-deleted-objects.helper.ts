export const checkDeletedObjects = (oldArray: any[], updatedArray: any[]) => {
  oldArray = oldArray.filter(oldUser => !updatedArray.includes(oldUser.toString()));
  updatedArray = updatedArray.filter(user => !oldArray.includes(user));

  return {deleted: oldArray, updated: updatedArray};
};
