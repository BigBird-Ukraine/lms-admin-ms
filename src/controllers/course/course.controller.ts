import {NextFunction, Response} from 'express';
import * as Joi from 'joi';

import {ResponseStatusCodesEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {ICourse, IRequestExtended} from '../../interfaces';
import {courseService} from '../../services';
import {courseValidator, filterParametresValidator, modulesListValidator} from '../../validators';

const courseSortingAttributes: Array<keyof ICourse> = ['_id', 'label', 'level', 'modules_list'];

class CourseController {

    async createCourse(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const course = req.body;
            const courseValidity = Joi.validate(course, courseValidator);

            if (courseValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, courseValidity.error.details[0].message));
            }

            await courseService.createCourse(course);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {
        try {

            const {
                pageSize,
                pageIndex,
                offset = pageSize * pageIndex,
                order = '_id',
                ...filterParams
            } = req.query;

            const filterValidity = Joi.validate(filterParams, filterParametresValidator);

            if (filterValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
            }

            if (!courseSortingAttributes.includes(order)) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'You can\'t sort by this parameter'));
            }

            for (const filterParamsKey in filterParams) {
                if (filterParamsKey) {
                    filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
                }
            }

            const courses = await courseService.getCourses(filterParams, +pageSize, offset, order);
            const count = await courseService.getSizeOfAll(filterParams) as number;
            res.json({
                data: {
                    courses,
                    count
                }
            });
        } catch (e) {
            next(e);
        }
    }

    async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {course_id} = req.params;

            const course = await courseService.getCourseByID(course_id);

            res.json({
                data: course
            });

        } catch (e) {
            next(e);
        }
    }

    async updateById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {course_id} = req.params;
            const course = req.body as ICourse;

            const filterValidity = Joi.validate(course, courseValidator);

            if (filterValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
            }
            await courseService.updateCourse(course_id, course);

            res.end()
        } catch (e) {
            next(e)
        }
    }

    async updateModulesList(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {course_id} = req.params;
            const modules_list = req.body as Partial<ICourse>;
            const filterValidity = Joi.validate(modules_list, modulesListValidator);

            if (filterValidity.error) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
            }
            await courseService.updateCourse(course_id, modules_list);

            res.end();
        } catch (e) {
            next(e);
        }
    }

    async deleteCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {course_id} = req.params;

            await courseService.deleteCourseByID(course_id);

            res.json(`course ${course_id} has been deleted`);
        } catch (e) {
            next(e);
        }
    }
}

export const courseController = new CourseController();
