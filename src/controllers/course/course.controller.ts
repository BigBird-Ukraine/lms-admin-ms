import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { regexFilterParams } from '../../helpers';
import { ICourseSubject, IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';

class CourseController {

    async createCourse(req: IRequestExtended, res: Response, next: NextFunction) {
        const course = req.body;

        await courseService.createCourse(course);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {
        const {
            pageSize,
            pageIndex,
            offset = pageSize * pageIndex,
            order = '_id',
            ...filterParams
        } = req.query;

        const updatedFilterParams = regexFilterParams(filterParams);

        const courses = await courseService.getCourses(updatedFilterParams, +pageSize, offset, order);
        const count = await courseService.getSizeOfAll(updatedFilterParams) as number;

        res.json({
            data: {
                courses,
                count
            }
        });
    }

    async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
        const {course_id} = req.params;

        const course = await courseService.getCourseByID(course_id);

        res.json({
            data: course
        });
    }

    async updateById(req: IRequestExtended, res: Response, next: NextFunction) {
        const {course_id} = req.params;
        const course = req.body as ICourseSubject;

        await courseService.updateCourse(course_id, course);

        res.end();
    }

    async updateModulesList(req: IRequestExtended, res: Response, next: NextFunction) {
        const {course_id} = req.params;
        const modules_list = req.body as Partial<ICourseSubject>;

        await courseService.updateCourse(course_id, modules_list);

        res.end();
    }

    async deleteCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
        const {course_id} = req.params;

        await courseService.deleteCourseByID(course_id);

        res.json(`course ${course_id} has been deleted`);
    }
}

export const courseController = new CourseController();
