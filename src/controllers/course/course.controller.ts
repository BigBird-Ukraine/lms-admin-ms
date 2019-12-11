import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { courseService } from '../../services';
import { courseValidator } from '../../validators';
import { IRequestExtended } from '../../Interfaces';

class CourseController {

    async getAllCourses(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const courses = await courseService.getAllCourses();

            res.json({
                data: courses
            });
        } catch (e) {
            next(e);
        }
    }

    async createCourse(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const course = req.body;
            const courseValidity = Joi.validate(course, courseValidator);

            if (courseValidity.error) {
                return next( new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, courseValidity.error.details[0].message));
            }

            await courseService.createCourse(course);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    editCourse(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { course_id } = req.params;

            res.json(`${course_id} edited (NO)`);
        } catch (e) {
            next(e);
        }
    }
}

export const courseController = new CourseController();
