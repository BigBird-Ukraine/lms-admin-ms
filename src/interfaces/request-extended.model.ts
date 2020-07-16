import { Request } from 'express-serve-static-core';
import { IQuestion } from './question.model';

export interface IRequestExtended extends Request {
    user?: any;
    group?: any;
    files?: any;
    question?: IQuestion;
}
