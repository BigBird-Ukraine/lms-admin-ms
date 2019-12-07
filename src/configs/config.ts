export const config = {
    PORT: process.env.PORT || 3002,
    HOST: 'http://localhost',

    JWT_SECRET: process.env.JWT_SECRET || '82!10-ac1906@d8f3-fca28d61d9e-99b60db',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || '250!940-61a2fef-d1cdc687ae-65474@c367',
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
