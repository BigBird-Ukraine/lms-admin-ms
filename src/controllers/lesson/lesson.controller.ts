import { NextFunction, Request, Response } from 'express';

import { GoogleConfigEnum, ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { calculationPageCount, checkDeletedObjects, googleDeleter, googleUploader } from '../../helpers';
import { ILesson, IRequestExtended, IUser } from '../../interfaces';
import { commentService, lessonService, moduleService, questionService } from '../../services';

const sortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const lessonValue = req.body;
    const {_id} = req.user as IUser;

    const lesson = await lessonService.createLesson({...lessonValue, user_id: _id}) as any;

    if (req.files) {
      const {files} = req.files;
      const video_path = await googleUploader(files,
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.VIDEO_GOOGLE_BUCKET_NAME
      );

      await lessonService.editLessonById(lesson._id, {video_path});
    }

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getLessons(req: Request, res: Response, next: NextFunction) {
    const {
      limit,
      offset = 0,
      sort = '_id',
      order,
      ...filter
    } = req.query;

    if (!sortingAttributes.includes(sort)) {
      throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'Cant sort by this params');
    }

    const lesson = await lessonService.getLessons(+limit, +offset, sort, order, filter);
    const count = await lessonService.getSizeOfAll(filter) as number;

    res.json({
      data: {
        lesson,
        count,
        pageCount: calculationPageCount(count, limit)
      }
    });
  }

  async getLessonById(req: IRequestExtended, res: Response, next: NextFunction) {
    const lesson = req.lesson as ILesson;

    res.json({data: lesson});
  }

  async generateTestByLessonId(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;

    const questions_id = await lessonService.getQuestionsForTestByLessonId(lesson_id);

    res.json({data: questions_id});
  }

  async updateMyLesson(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const updatingData = req.body as Partial<ILesson>;

    const updatedLesson = await lessonService.editLessonById(lesson_id, updatingData);

    res.json({
      data: updatedLesson
    });
  }

  async addQuestionToLesson(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const {NewQuestions_id} = req.body;

    const {questions_id} = await lessonService.getLessonByID(lesson_id);

    if (questions_id) {
      const { deleted, updated } = checkDeletedObjects(questions_id, NewQuestions_id);
      if (updated.length) { await questionService.addLessonInQuestion(updated, lesson_id); }
      if (deleted.length) { await questionService.deleteLessonInQuestion(deleted, lesson_id); }
      }

    const updatedLesson = await lessonService.addQuestionsToLesson(lesson_id, NewQuestions_id);

    res.json({
      data: updatedLesson
    });
  }

  async deleteMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const {video_path} = req.lesson as ILesson;

    await lessonService.deleteLessonById(lesson_id);
    if (video_path) {
      await googleDeleter(GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.VIDEO_GOOGLE_BUCKET_NAME,
        video_path);
    }

    res.end();
  }

  async getMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const lesson = await lessonService.getMyLesson(_id);

    res.json({
      data: {
        lesson
      }
    });
  }

  async getStatics(req: IRequestExtended, res: Response, next: NextFunction) {
    const allModules = await moduleService.getAllModulesLabel();
    const statistics = [];

    for await (const module of allModules) {
      const count = await moduleService.getLessonsStatistic(module._id);
      statistics.push({label: module.label, count, _id: module._id});
    }

    res.json(statistics);
  }

  async getLessonsByModule(req: IRequestExtended, res: Response, next: NextFunction) {
    const lessons = await lessonService.getLessonsByModule(req.query.module_id);

    res.json(lessons);
  }

  async getLessonsLabel(req: IRequestExtended, res: Response, next: NextFunction) {

    res.json(await lessonService.getLessonsLabel());
  }

  async saveComment(req: IRequestExtended, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const {_id} = req.user as any;
    const {text} = req.body;

    await commentService.saveComment({lesson_id, text, user_id: _id});

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getCommentaries(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.lesson as any;
    const {
      pageSize,
      pageIndex,
      offset = pageSize * pageIndex,
      ...filterParams
    } = req.query;

    const comments = await commentService.getCommentaries(_id, +pageSize, offset);
    const count = comments.length && await commentService.getSizeOfAll(filterParams) || 0;

    res.json({
      data: {
        comments,
        count
      }
    });
  }

  async deleteComment(req: IRequestExtended, res: Response, next: NextFunction) {
    const {comment_id} = req.query;

    await commentService.delete(comment_id);

    res.end();
  }

  async editComment(req: IRequestExtended, res: Response, next: NextFunction) {
    const {comment_id} = req.query;
    const {text} = req.body;

    await commentService.editComment(comment_id, text);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async changeVideo(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, video_path} = req.lesson as ILesson;
    const {files} = req.files;

    if (_id) {
      await googleDeleter(
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.VIDEO_GOOGLE_BUCKET_NAME, video_path
      );

      const uploaded_video_path = await googleUploader(files,
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.VIDEO_GOOGLE_BUCKET_NAME
      );

      await lessonService.editLessonById(_id, {video_path: uploaded_video_path});

    }

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }
}

export const lessonController = new LessonController();
