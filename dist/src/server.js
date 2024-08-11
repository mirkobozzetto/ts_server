"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const handlers_1 = require("./handlers");
const router_1 = require("./router");
const requestParser_1 = require("./utils/requestParser");
const server = http_1.default.createServer((req, res) => {
    (0, requestParser_1.parseRequest)(req, (data) => {
        const chosenHandler = typeof router_1.router[data.trimmedPath] !== "undefined"
            ? router_1.router[data.trimmedPath]
            : handlers_1.handlers.notFound;
        chosenHandler(data, (statusCode, payload) => {
            const payloadString = JSON.stringify(payload);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(`Response: ${statusCode} ${payloadString}`);
        });
    });
});
server.listen(config_1.port, () => {
    console.log(`Server listening on http://localhost:${config_1.port}`);
});
