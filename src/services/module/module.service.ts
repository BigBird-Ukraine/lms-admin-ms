import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { CourseType, Module, ModuleSchema, ModuleType } from '../../database';
import { IModule } from '../../interfaces';

class ModuleService {

  createModule(moduleValue: IModule): Promise<any> {
    const newModule = new Module(moduleValue);

    return newModule.save();
  }

  getModulesByParams(filterParams: Partial<IModule>, limit: number, skip: number, order: string): Promise<any> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME, ModuleSchema);

    return ModuleModel
      .find(filterParams)
      .limit(limit)
      .skip(skip)
      .sort(order) as any;
  }

  getSizeOfAll(filterParams: Partial<IModule>): Promise<any> {
    const ModuleModel = model<CourseType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME, ModuleSchema);

    return ModuleModel
      .countDocuments(filterParams) as any;
  }

  getModuleByID(module_id: string): Promise<IModule> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel
      .findOne({_id: module_id})
      .populate('lesson_list')
      .select({_id: 0}) as any;
  }

  editModule(module_id: string, updating_value: Partial<IModule>): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.updateOne({module_id}, {updating_value}) as any;
  }

  deleteModuleByID(module_id: string): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.deleteOne({_id: module_id}) as any;
  }
}

export const moduleService = new ModuleService();
