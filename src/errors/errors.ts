import { config } from '../configs';

export const errors = {
  // 400
  BAD_REQUEST_WRONG_PARAMS: {
    message: 'Bad request wrong params',
    code: 4000
  },
  BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
    message: 'User already exist',
    code: 4001
  },

  BAD_REQUEST_LIMIT_QUESTION: {
    code: 4007,
    message: `Lesson can contain only ${config.MAX_QUESTION_LIMIT} questions`
  },

  BAD_REQUEST_MAX_PHOTO_SIZE: {
    code: 4002,
    message: `Max photo size is ${config.MAX_PHOTO_SIZE / (1024 * 1024)}mb`
  },

  BAD_REQUEST_INVALID_FILE_MIMETYPE: {
    code: 4003
  },

  BAD_REQUEST_MAX_PHOTO_AMOUNT: {
    code: 4004,
    message: 'Cant upload more than one user photo'
  },
  // 401
  UNAUTHORIZED_WRONG_CREDENTIALS: {
    code: 4011,
    message: 'Wrong email or password'
  },
  // 403
  FORBIDDEN_USER_BLOCKED: { // When user try to do something with blocked account
    message: 'User is blocked',
    code: 4031
  },

  FORBIDDEN_NOT_YOUR_QUESTION: {
    message: 'Not your question',
    code: 4033
  },

  // 404
  NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
    message: 'User is not found',
    code: 4041
  },

  NOT_FOUND_COURSE_NOT_PRESENT: { // When user wants get course witch not found in DB
    message: 'Course is not found',
    code: 4042
  },

  NOT_FOUND_MODULE_PRESENT: { // When user wants get module witch not found in DB
    message: 'Module is not found',
    code: 4043
  },

  NOT_FOUND_GROUP_NOT_PRESENT: {
    message: 'Group is not found',
    code: 4043
  },

  NOT_FOUND_QUESTION_NOT_PRESENT: {
    message: 'Question is not found',
    code: 4042
  },

  NOT_FOUND_LESSON_NOT_PRESENT: {
    message: 'Lesson not found',
    code: 4043
  }
};
