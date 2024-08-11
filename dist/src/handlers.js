"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const dataHandlers = {
    get: (data, callback) => {
        callback(200, { message: "There are some data" });
    },
    post: (data, callback) => {
        console.log("Données reçues:", data.payload);
        callback(201, { message: "Data received successfully" });
    },
};
exports.handlers = {
    home: (data, callback) => {
        callback(200, { message: "Welcome everybody !" });
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
