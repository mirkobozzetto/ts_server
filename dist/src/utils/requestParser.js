"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequest = void 0;
const url_1 = __importDefault(require("url"));
const parseRequest = (req, callback) => {
    var _a;
    const parsedUrl = url_1.default.parse(req.url || "", true);
    const path = parsedUrl.pathname || "";
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    const method = ((_a = req.method) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "get";
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;
    let body = [];
    req
        .on("data", (chunk) => {
        body.push(chunk);
    })
        .on("end", () => {
        const payload = Buffer.concat(body).toString();
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload,
        };
        callback(data);
    });
};
exports.parseRequest = parseRequest;
