"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.loggingMiddleware = exports.applyMiddleware = void 0;
const applyMiddleware = (middlewares, data) => {
    return middlewares.reduce((promise, middleware) => {
        return promise.then(() => new Promise((resolve, reject) => {
            middleware(data, (error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        }));
    }, Promise.resolve());
};
exports.applyMiddleware = applyMiddleware;
const loggingMiddleware = (data, next) => {
    console.log(`[${new Date().toISOString()}] ${data.method.toUpperCase()} ${data.trimmedPath}`);
    next();
};
exports.loggingMiddleware = loggingMiddleware;
const authMiddleware = (data, next) => {
    const authToken = data.headers["authorization"];
    if (authToken === "secret-token") {
        next();
    }
    else {
        next(new Error("Unauthorized"));
    }
};
exports.authMiddleware = authMiddleware;
