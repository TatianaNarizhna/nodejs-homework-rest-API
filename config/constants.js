const ValidInfoName = {
    MIN_NAME: 3,
    MAX_NAME: 30
};

const Subscript = {
    STARTER: 'starter',
    PRO: 'pro',
    BUSINESS: 'business',
}

const HttpCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,

}

const LimitJson = {
    limit: 10000,
}

const FieldSize = {
    limit: 2000000,
}

module.exports = {
    ValidInfoName,
    Subscript,
    HttpCode,
    LimitJson,
    FieldSize,
};

