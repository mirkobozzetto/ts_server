"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "mirkobozzetto",
    host: "localhost",
    database: "ts_server",
    password: "mysecretpassword",
    port: 5432,
});
exports.default = pool;
