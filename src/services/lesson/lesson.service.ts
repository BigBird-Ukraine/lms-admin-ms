import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Lesson, LessonSchema, LessonType, Module, Question } from '../../database';
import { ILesson } from '../../interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<ILesson> {
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

  getLessonsLabel() {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.find().select({label: 1});
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
      .populate('questions_id');
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

    return LessonModel.findByIdAndUpdate(lesson_id, {...updatingData, last_valid_version: ''}, {new: true}) as any;
  }

  addQuestionsToLesson(lesson_id: string, questions_list: string): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.findByIdAndUpdate(lesson_id, {$set: {questions_id: questions_list},
      last_valid_version: ''}, {new: true}) as any;
  }

  deleteLessonById(lesson_id: string): Promise<void> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findByIdAndRemove(lesson_id, (err, post) => {
        Module.update(
          { lessons_list : lesson_id},
          { $pull: { lessons_list: lesson_id } },
          { multi: true })
          .exec();

        Question.update(
          { lesson_id},
          { $pull: { lesson_id } },
          { multi: true })
          .exec();

      }) as any;
  }

  getLessonsByModule(module_id: string): Promise<any> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.find({module_id: {$all: [module_id]}})
      .select({number: 1, tags: 1, label: 1, description: 1, _id: 0}) as any;
  }

  addModuleInLesson(lessons_id: string[], module_id: string) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.bulkWrite(lessons_id.map(lesson_id => {
      return {
        updateOne: {
          filter: {_id: lesson_id},
          update: {
            $addToSet: {module_id}
          },
          upsert: true
        }
      };
    }));
  }

  deleteModuleOfLesson(lessons_id: string[], module_id: string) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.bulkWrite(lessons_id.map(lesson_id => {
      return {
        updateOne: {
          filter: {_id: lesson_id},
          update: {
            $pull: {module_id}
          },
          upsert: true
        }
      };
    }));
  }

  resetLastValidLessons(lessons_id: string[]) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.bulkWrite(lessons_id.map(lesson_id => {
      return {
        updateOne: {
          filter: {_id: lesson_id},
          update: {
            $set: {last_valid_version: ''}
          },
          upsert: true
        }
      };
    }));
  }
}

export const lessonService = new LessonService();
