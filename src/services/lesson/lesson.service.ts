import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Lesson, LessonSchema, LessonType } from '../../database';
import { ILesson } from '../../interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<void> {
    const newLesson = new Lesson(lessonValue);

    return newLesson.save() as any;
  }

  getLessons(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<ILesson[]> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);
    order = order === 'ASC' ? 'ASC' : 'DESC';

    return LessonModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  getSizeOfAll(filterParams: Partial<ILesson>): Promise<any> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .countDocuments(filterParams) as any;
  }
}

export const lessonService = new LessonService();
