export const config = {
    PORT: process.env.PORT || 3002,
    HOST: 'http://localhost',

    JWT_SECRET: process.env.JWT_SECRET || 'uf7e^Wai8efj32-&&620O10fm-32jfdj',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || '3f7e^fdf(*kjsd-&&620O10fm-333222fsd',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    },

    DATABASE_NAME: 'QuestionDB',
    DATABASE_USER: 'root',
    DATABASE_PASS: 'root',
    DATABASE_IP: '127.0.0.1',
    DATABASE_PORT: '27017',

    /*Mongo Collections*/
    USER_COLLECTION_NAME: 'User',
    GROUP_COLLECTION_NAME: 'Group',
    OAUTH_TOKEN_COLLECTION_NAME: 'Oauth_token'
};
