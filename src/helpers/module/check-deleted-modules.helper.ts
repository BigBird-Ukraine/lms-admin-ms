export const checkDeletedModules = (oldArrayModules: any[], updatedArrayModules: string[]) => {
  oldArrayModules = oldArrayModules.filter(oldModule => !updatedArrayModules.includes(oldModule.toString()));
  updatedArrayModules = updatedArrayModules.filter(module => !oldArrayModules.includes(module));

  return {deleted: oldArrayModules, updated: updatedArrayModules};
};
