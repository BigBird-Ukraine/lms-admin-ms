import { Request } from 'express-serve-static-core';
import { ICourse } from './course.model';
import { ILesson } from './lesson.model';
import { IModule } from './module.model';
import { IQuestion } from './question.model';
import { ITestResultModel } from './test_result.model';

export interface IRequestExtended extends Request {
    user?: any;
    group?: any;
    files?: any;
    question?: IQuestion;
    passed_test?: ITestResultModel;
    lesson?: ILesson;
    photos?: any[]; // TODO
    course?: ICourse;
    module?: IModule;
    refresh_token?: any;
}
