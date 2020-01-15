export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: 'User already exist',
        code: 4001
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
    }
};
