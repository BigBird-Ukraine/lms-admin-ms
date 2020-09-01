import { IQuestion } from './question.model';

export interface IPassedLesson {
  _id?: string;
  lesson_label?: string;
  lesson_description?: string;
  questions: string[];
}

export interface IPassedLessonFull {
  _id?: string;
  lesson_label?: string;
  lesson_description?: string;
  questions: Partial<IQuestion[]>;
}
