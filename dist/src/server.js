"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const handlers_1 = require("./handlers");
const middleware_1 = require("./middleware");
const router_1 = require("./router");
const requestParser_1 = require("./utils/requestParser");
const server = http_1.default.createServer((req, res) => {
    (0, requestParser_1.parseRequest)(req, (data) => {
        const routeConfig = router_1.router[data.trimmedPath] || {
            handler: handlers_1.handlers.notFound,
        };
        const { handler, middlewares = [] } = routeConfig;
        (0, middleware_1.applyMiddleware)(middlewares, data)
            .then(() => {
            handler(data, (statusCode, payload) => {
                const payloadString = JSON.stringify(payload);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                res.end(payloadString);
                console.log(`Response: ${statusCode} ${payloadString}`);
            });
        })
            .catch((error) => {
            res.writeHead(401);
            res.end(JSON.stringify({ error: error.message }));
        });
    });
});
server.listen(config_1.port, () => {
    console.log(`Server listening on http://localhost:${config_1.port}`);
});
