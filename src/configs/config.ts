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

    MONGO_URL: 'mongodb+srv://lmaadmin:lmsadmin2020@cluster0.sfb2x.mongodb.net/lmsDB?retryWrites=true&w=majority',

    MAX_QUESTION_LIMIT: 20

    /*Mongo Collections*/

};
