export const checkDeletedUsers = (oldArrayUsers: string[], updatedArrayUsers: string[]) => {
  oldArrayUsers = oldArrayUsers.filter(oldUser => !updatedArrayUsers.includes(oldUser.toString()));
  updatedArrayUsers = updatedArrayUsers.filter(user => !oldArrayUsers.includes(user));

  return {deleted: oldArrayUsers, updated: updatedArrayUsers};
};
