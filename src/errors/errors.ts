import { StatusesEnum } from '../constants/enums';

export const errors = {
    // 400
    BAD_REQUEST_WRONG_PARAMS: {
        message: StatusesEnum.BAD_REQUEST_WRONG_PARAMS,
        code: 4000
    },
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: StatusesEnum.USER_ALREADY_EXIST,
        code: 4001
    },
    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 4011,
        message: StatusesEnum.WRONG_EMAIL_OR_PASSWORD
    },
    // 403
    FORBIDDEN_USER_BLOCKED: { // When user try to do something with blocked account
        message: StatusesEnum.USER_IS_BLOCKED,
        code: 4031
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: StatusesEnum.USER_NOT_FOUND,
        code: 4041
    },

    NOT_FOUND_COURSE_NOT_PRESENT: { // When user wants get course witch not found in DB
        message: StatusesEnum.COURSE_NOT_FOUND,
        code: 4042
    },

    NOT_FOUND_MODULE_PRESENT: { // When user wants get module witch not found in DB
        message: StatusesEnum.MODULE_NOT_FOUND,
        code: 4043
    },

    NOT_FOUND_GROUP_NOT_PRESENT: {
        message: StatusesEnum.GROUP_NOT_FOUND,
        code: 4043
    }
};
