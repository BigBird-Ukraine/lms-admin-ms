import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { Lesson, Question, QuestionSchema, QuestionType } from '../../database';
import { IQuestion } from '../../interfaces';

class QuestionService {

  createQuestion(questionValue: IQuestion): Promise<any> {
    const newQuestion = new Question(questionValue);
    return newQuestion.save();
  }

  async updateQuestion(question: Partial<IQuestion>): Promise<any> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel
      .findByIdAndUpdate(question._id, question) as any;
  }

  getQuestions(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<IQuestion[]> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);
    order = order === 'ASC' ? 'ASC' : 'DESC';

    return QuestionModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  async getMyQuestion(_id: string, limit: number, offset: number): Promise<IQuestion[]> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel
      .find({user_id: `${_id}`}); // todo limit offset bug(dont queriing with this parameters)

  }

  async getQuestionById(questionId: string): Promise<IQuestion> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel
      .findOne({_id: `${questionId}`}) as any;
  }

  async getAnswersByQuestionId(questionId: string): Promise<IQuestion> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel.findById(questionId).select({answers: 1, _id: 0}) as any;
  }

  async deleteQuestionById(questions_id: string) {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel.findByIdAndDelete(questions_id, (err) => {
      Lesson.update(
        { questions_id },
        { $pull: { questions_id } },
        { multi: true })
        .exec();
    }) as any;
  }

  getSizeOfAll(filterParams: Partial<IQuestion>): Promise<any> {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel
      .countDocuments(filterParams) as any;
  }

  getQuestionsStatistic(subject: string) {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel
      .countDocuments({subject}) as any;
  }

  getQuestionBySubject(subject: string) {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel.find({subject})
      .select({question: 1, description: 1, tags: 1});
  }

  addLessonInQuestion(questions_id: string[], lesson_id: string) {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel.bulkWrite(questions_id.map(question_id => {
      return {
        updateOne: {
          filter: {_id: question_id},
          update: {
            $addToSet: {lesson_id}
          },
          upsert: true
        }
      };
    }));
  }

  deleteLessonInQuestion(questions_id: any[], lesson_id: string) {
    const QuestionModel = model<QuestionType>(DatabaseTablesEnum.QUESTION_COLLECTION_NAME, QuestionSchema);

    return QuestionModel.bulkWrite(questions_id.map(question_id => {
      return {
        updateOne: {
          filter: {_id: question_id},
          update: {
            $pull: {lesson_id}
          },
          upsert: true
        }
      };
    }));
  }
}

export const questionService = new QuestionService();
