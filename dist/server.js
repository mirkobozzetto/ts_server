"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const port = 3000;
const server = http_1.default.createServer((req, res) => {
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
        const chosenHandler = typeof router[trimmedPath] !== "undefined"
            ? router[trimmedPath]
            : handlers.notFound;
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload,
        };
        chosenHandler(data, (statusCode, payload) => {
            const payloadString = JSON.stringify(payload);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(`Réponse: ${statusCode} ${payloadString}`);
        });
    });
});
server.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
const dataHandlers = {
    get: (data, callback) => {
        callback(200, { message: "Voici quelques données du serveur" });
    },
    post: (data, callback) => {
        console.log("Données reçues:", data.payload);
        callback(201, { message: "Données reçues avec succès" });
    },
};
const handlers = {
    home: (data, callback) => {
        callback(200, { message: "Bienvenue sur notre serveur backend!" });
    },
    data: (data, callback) => {
        const acceptableMethods = ["get", "post"];
        if (acceptableMethods.includes(data.method) &&
            data.method in dataHandlers) {
            dataHandlers[data.method](data, callback);
        }
        else {
            callback(405, {});
        }
    },
    notFound: (data, callback) => {
        callback(404, {});
    },
};
const router = {
    "": handlers.home,
    "api/data": handlers.data,
};
