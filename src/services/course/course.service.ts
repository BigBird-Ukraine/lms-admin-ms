import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Course, CourseSchema, CourseType } from '../../database';
import { ICourse, IModuleFromCourseModel } from '../../Interfaces';

class CourseService {

    createCourse(createObject: ICourse): Promise<void> {
        const newCourse = new Course(createObject);
        return newCourse.save() as any;
    }

    deleteCourseByID(course_id: string): Promise<void> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

        return CourseModel.deleteOne({ _id: course_id }) as any;
    }

    getCourseByID(course_id: string): Promise<IModuleFromCourseModel> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

        // TODO test this
        return CourseModel
            .findOne({ _id: course_id })
            .populate('modules_list')
            .select({ modules_list: 1, _id: 0 }) as any;
    }

    getAllCourses(): Promise<ICourse[]> {
        const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);
        return CourseModel.find() as any;
    }
}

export const courseService = new CourseService();
