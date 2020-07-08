import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services';

class LessonController {

    async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {
        const lesson = req.body;

        await lessonService.createLesson(lesson);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }
}

export const lessonController = new LessonController();
