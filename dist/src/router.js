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
};
