import { Lesson } from '../../database';
import { ILesson } from '../../Interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<any> {
    const newLesson = new Lesson(lessonValue);

    return newLesson.save();
  }
}

export const lessonService = new LessonService();
