"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const handlers_1 = require("./handlers");
exports.router = {
    "": handlers_1.handlers.home,
    "api/data": handlers_1.handlers.data,
};
