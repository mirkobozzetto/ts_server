"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const dbOperations_1 = require("./dbOperations");
const dataHandlers = {
    get: (data, callback) => {
        callback(200, { message: "There are some data" });
    },
    post: (data, callback) => {
        console.log("Data received:", data.payload);
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
    createTopic: (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = JSON.parse(data.payload);
            const topic = yield (0, dbOperations_1.createTopic)(name);
            callback(201, { message: "Topic created successfully", topic });
        }
        catch (error) {
            callback(500, { error: "Failed to create topic" });
        }
    }),
    addPhrase: (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { topicId, phrase } = JSON.parse(data.payload);
            const newPhrase = yield (0, dbOperations_1.addPhrase)(topicId, phrase);
            callback(201, {
                message: "Phrase added successfully",
                phrase: newPhrase,
            });
        }
        catch (error) {
            callback(500, { error: "Failed to add phrase" });
        }
    }),
    getTopic: (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topicId = parseInt(data.queryStringObject.id);
            const topic = yield (0, dbOperations_1.getTopicWithPhrases)(topicId);
            if (topic) {
                callback(200, topic);
            }
            else {
                callback(404, { error: "Topic not found" });
            }
        }
        catch (error) {
            callback(500, { error: "Failed to get topic" });
        }
    }),
};
