export enum StatusesEnum {
    // 400
    BAD_REQUEST = 'Bad request',
    BAD_REQUEST_WRONG_PARAMS = 'Bad request, wrong params',
    USER_ALREADY_EXIST = 'User already exist',
    CANT_UPLOAD_MORE_THAN_ONE_USER_PHOTO = 'You can\'t upload more than one userPhotos',
    CANT_SORT_BY_THIS_PARAM = 'You can\'t sort by this parameter',
    QUESTION_ALREADY_EXIST = 'This question already exist',

    // 401
    WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password',
    WRONG_ACTION_TYPE = 'Wrong action type',
    NO_TOKEN = 'No token',
    INVALID_TOKEN = 'Invalid token',

    // 403
    USER_IS_BLOCKED = 'User is blocked',
    NO_PERMISSIONS_TO_ACTION = 'You have no permissions to this action',
    NOT_YOUR_QUESTION = 'Its not your question',
    NOT_YOUR_LESSON = 'Its not your lesson',
    CONTROLLER_ERROR = 'Controller Error',

    // 404
    USER_NOT_FOUND = 'User is not found',
    QUESTION_NOT_FOUND = 'Question not found',
    LESSON_NOT_FOUND = 'Lesson not found',
    COURSE_NOT_FOUND = 'Course is not found',
    MODULE_NOT_FOUND = 'Module is not found',
    GROUP_NOT_FOUND = 'Group is not found',
    API_ROUTE_NOT_FOUND = 'API route not found'

}
