import {model} from 'mongoose';

import {DatabaseTablesEnum} from '../../constants';
import {Course, CourseSchema, CourseType} from '../../database';
import {ICourse, IModule, IModuleFromCourseModel} from '../../interfaces';

class CourseService {

    createCourse(createObject: ICourse): Promise<void> {
        const newCourse = new Course(createObject);
        return newCourse.save() as any;
    }

    deleteCourseByID(course_id: string): Promise<void> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

        return CourseModel.deleteOne({_id: course_id}) as any;
    }

    getCourseByID(course_id: string): Promise<IModule> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

        return CourseModel
            .findOne({_id: course_id})
            .populate('modules_list')
            .select({_id: 0}) as any;
    }

    // todo think about this
    getModulesByCourseID(course_id: string): Promise<IModuleFromCourseModel> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

        // TODO test this
        return CourseModel
            .findOne({_id: course_id})
            .populate('modules_list')
            .select({label: 1, module_list: 1, _id: 0}) as any;
    }

    getCourses(filterParams: Partial<ICourse>, limit: number, skip: number, order: string): Promise<any> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);
        return CourseModel
            .find({...filterParams})
            .populate('modules_list')
            .limit(limit)
            .skip(skip)
            .sort(order) as any;
    }

    getSizeOfAll(filterParams: Partial<ICourse>): Promise<any> {
        const GroupModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);
        return GroupModel
            .countDocuments({...filterParams}) as any;
    }

    updateCourse(course_id: string, patchObject: Partial<ICourse>): Promise<any> {
        patchObject.updated_at = new Date().toString();
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);
        return CourseModel
            .findByIdAndUpdate(course_id, patchObject) as any;
    }
}

export const courseService = new CourseService();
