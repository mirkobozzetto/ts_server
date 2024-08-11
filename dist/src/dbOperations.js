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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicWithPhrases = exports.addPhrase = exports.createTopic = void 0;
const db_1 = __importDefault(require("./db"));
const createTopic = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("INSERT INTO topics(name) VALUES($1) RETURNING *", [name]);
    return result.rows[0];
});
exports.createTopic = createTopic;
const addPhrase = (topicId, phrase) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("INSERT INTO phrases(topic_id, content) VALUES($1, $2) RETURNING *", [topicId, phrase]);
    return result.rows[0];
});
exports.addPhrase = addPhrase;
const getTopicWithPhrases = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT t.id, t.name, json_agg(p.content) as phrases FROM topics t LEFT JOIN phrases p ON t.id = p.topic_id WHERE t.id = $1 GROUP BY t.id", [topicId]);
    return result.rows[0];
});
exports.getTopicWithPhrases = getTopicWithPhrases;
