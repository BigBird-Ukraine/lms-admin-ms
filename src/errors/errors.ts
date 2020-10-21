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

  BAD_REQUEST_ROOM_ALREADY_EXIST: {
    code: 4008,
    message: 'This room already exist'
  },

  BAD_REQUEST_INVALID_DATE: {
    code: 4009,
    message: 'Invalid date'
  },

  BAD_REQUEST_IP_ALREADY_EXIST: {
    code: 4010,
    message: 'This IP already exist'
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

  FORBIDDEN_ROOM_HAS_USERS: {
    message: 'This room has users, you cant update date',
    code: 4036
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

  NOT_FOUND_COMMENT_NOT_PRESENT: {
    message: 'Comment is not found',
    code: 4043
  },

  NOT_FOUND_QUESTION_NOT_PRESENT: {
    message: 'Question is not found',
    code: 4042
  },

  NOT_FOUND_LESSON_NOT_PRESENT: {
    message: 'Lesson not found',
    code: 4043
  },

  NOT_FOUND_CITY_NOT_PRESENT: {
    message: 'City not found',
    code: 4043
  },

  NOT_FOUND_VISIT_LOG_NOT_PRESENT:  {
    message: 'Visit log nog found',
    code: 4047
  },

  NOT_FOUND_ROOM_NOT_PRESENT: {
    message: 'Room not found',
    code: 4048
  },

  NOT_FOUND_IP_NOT_PRESENT: {
    message: 'IP not found',
    code: 4049
  },

  NOT_FOUND_SETTING_ROOM_NOT_PRESENT: {
    message: 'Setting room not found',
    code: 4050
  }
};
