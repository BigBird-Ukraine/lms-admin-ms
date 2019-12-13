import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Module, ModuleType } from '../../database';
import { IModule } from '../../interfaces';

class ModuleService {

  createModule(moduleValue: IModule): Promise<any> {
    const newModule = new Module(moduleValue);

    return newModule.save();
  }

  getAllModules(): Promise<IModule[]> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.find() as any;
  }

  getModuleByID(module_id: string): Promise<IModule> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel
      .findOne({ _id: module_id })
      .populate('lesson_list')
      .select({ _id: 0 }) as any;
  }

  editModule(module_id: string, updating_value: Partial<IModule>): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.updateOne({ module_id }, { updating_value }) as any;
  }

  deleteModuleByID(module_id: string): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.deleteOne({ _id: module_id }) as any;
  }
}

export const moduleService = new ModuleService();
