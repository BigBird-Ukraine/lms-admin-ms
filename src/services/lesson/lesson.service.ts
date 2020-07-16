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

  getQuestionsForTestByLessonId(lesson_id: string) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.findById(lesson_id)
      .select({ questions_id: 1, _id: 0 })
      .populate('questions_id', {'answers.correct' : 0});
  }

  getLessonByID(lesson_id: string): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findById(lesson_id) as any;
  }

  async getMyLesson(_id: string): Promise<ILesson[]> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .find({user_id: `${_id}`});
  }

  getLessonsQuestionsById(lesson_id: string): Promise<any> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findById(lesson_id).select({questions_id: 1, _id: 0}) as any;
  }

  editLessonById(lesson_id: string, updatingData: Partial<ILesson>): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findByIdAndUpdate(lesson_id, updatingData) as any;
  }

  addQuestionsToLesson(lesson_id: string, questions_list: string): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findByIdAndUpdate(lesson_id, {$set: {questions_id: questions_list}}, {new: true}) as any;
  }

  deleteLessonById(lesson_id: string): Promise<void> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findByIdAndDelete(lesson_id) as any;
  }
}

export const lessonService = new LessonService();
