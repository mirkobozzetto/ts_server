"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const handlers_1 = require("./handlers");
const middleware_1 = require("./middleware");
exports.router = {
    "": {
        handler: handlers_1.handlers.home,
        middlewares: [middleware_1.loggingMiddleware],
    },
    "api/data": {
        handler: handlers_1.handlers.data,
        middlewares: [middleware_1.loggingMiddleware, middleware_1.authMiddleware],
    },
    "api/topics": {
        handler: handlers_1.handlers.createTopic,
        middlewares: [middleware_1.loggingMiddleware, middleware_1.authMiddleware],
    },
    "api/phrases": {
        handler: handlers_1.handlers.addPhrase,
        middlewares: [middleware_1.loggingMiddleware, middleware_1.authMiddleware],
    },
    "api/topics/get": {
        handler: handlers_1.handlers.getTopic,
        middlewares: [middleware_1.loggingMiddleware],
    },
};
