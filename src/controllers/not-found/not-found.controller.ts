import { Request, Response } from 'express';

import { ResponseStatusCodesEnum, StatusesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';

export class NotFoundController {
    public all(req: Request, res: Response): void {
        throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, StatusesEnum.API_ROUTE_NOT_FOUND);
    }
}

export const notFoundController = new NotFoundController();
