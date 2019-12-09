import { model } from 'mongoose';

import { config } from '../../configs';
import { Course, CourseSchema, CourseType } from '../../database';
import { ICourse } from '../../Interfaces';

class CourseService {

    createCourse(createObject: ICourse) {
        const newCourse = new Course(createObject);
        return newCourse.save();
    }

    deleteCourseByID(course_id: string) {
        const CourseModel = model<CourseType>(config.COURSE_COLLECTION_NAME, CourseSchema);

        return CourseModel.deleteOne({ _id: course_id });
    }

    getCourseByID(course_id: string) {
        const CourseModel = model<CourseType>(config.COURSE_COLLECTION_NAME, CourseSchema);

        // TODO test this
        return CourseModel.findOne({ _id: course_id }).populate('modules_list').select({ modules_list: 1, _id: 0 });
    }

    async getAllCourses() {
        const CourseModel = model<CourseType>(config.COURSE_COLLECTION_NAME, CourseSchema);
        return CourseModel.find()
    }
}

export const courseService = new CourseService();
