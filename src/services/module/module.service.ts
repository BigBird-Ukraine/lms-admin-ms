import { Module } from '../../database';
import { IModule } from '../../Interfaces';

class ModuleService {

  createModule(moduleValue: IModule): Promise<any> {
    const newModule = new Module(moduleValue);

    return newModule.save();
  }
}

export const moduleService = new ModuleService();
