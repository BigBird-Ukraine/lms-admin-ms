import { Lesson } from '../../database';
import { ILesson } from '../../interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<void> {
    const newLesson = new Lesson(lessonValue);

    return newLesson.save() as any;
  }
}

export const lessonService = new LessonService();
