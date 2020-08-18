import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { Course, CourseType, Lesson, Module, ModuleSchema, ModuleType } from '../../database';
import { IModule } from '../../interfaces';

class ModuleService {

  createModule(moduleValue: IModule): Promise<any> {
    const newModule = new Module(moduleValue);

    return newModule.save() as any;
  }

  updateModule(module_id: string, lessons_list: any) {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.findByIdAndUpdate(module_id, {
      $set: {lessons_list}
    });
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

  getModuleByIDWithLessons(module_id: string): Promise<IModule> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel
      .findOne({_id: module_id})
      .populate('lessons_list', ['_id', 'label', 'description']) as any;
  }

  getModuleById(module_id: string): Promise<IModule> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel
      .findOne({_id: module_id}) as any;
  }

  getCroppedModules(): Promise<IModule[]> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.find({}, {_id: 1, label: 1, description: 1}) as any;
  }

  editModule(module_id: string, updating_value: Partial<IModule>): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.findByIdAndUpdate(module_id, updating_value, {new: true})
      .populate('lessons_list') as any;
  }

  deleteModuleByID(module_id: string): Promise<void> {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.deleteOne({_id: module_id}, (err) => {
      Course.update(
        { modules_list: module_id },
        { $pull: { modules_list: module_id } },
        { multi: true })
        .exec();

      Lesson.update(
        { module_id },
        { $pull: { module_id } },
        { multi: true })
        .exec();
    }) as any;
  }

  addModuleInCourse(modules_id: string[], course_id: string) {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.bulkWrite(modules_id.map(module_id => {
      return {
        updateOne: {
          filter: {_id: module_id},
          update: {
            $addToSet: {courses_id: course_id}
          },
          upsert: true
        }
      };
    }));
  }

  deleteModuleOfCourse(modules_id: any[], course_id: string) {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.bulkWrite(modules_id.map(module_id => {
      return {
        updateOne: {
          filter: {_id: module_id},
          update: {
            $pull: {courses_id: course_id}
          },
          upsert: true
        }
      };
    }));
  }

  getModulesByCourseId(courses_id: string) {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.find({courses_id: {$all: [courses_id]}})
      .select({label: 1, description: 1, _id: 0});
  }

  getAllModulesLabel() {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.find().select({label: 1, _id: 1});
  }

  getLessonsStatistic(_id: string) {
    const ModuleModel = model<ModuleType>(DatabaseTablesEnum.MODULE_COLLECTION_NAME);

    return ModuleModel.aggregate([
      {
        $match: {_id}
      },
      {
        $project: {
          lessons_list: {$size: '$lessons_list'}
        }
      }
    ]);
  }
}

export const moduleService = new ModuleService();
