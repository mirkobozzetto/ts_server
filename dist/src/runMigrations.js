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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const migrationsDir = path_1.default.join(__dirname, "..", "migrations");
        const migrationFiles = fs_1.default.readdirSync(migrationsDir).sort();
        for (const file of migrationFiles) {
            if (path_1.default.extname(file) === ".sql") {
                const filePath = path_1.default.join(migrationsDir, file);
                const sql = fs_1.default.readFileSync(filePath, "utf-8");
                console.log(`Running migration: ${file}`);
                try {
                    yield db_1.default.query(sql);
                    console.log(`Migration ${file} completed successfully.`);
                }
                catch (error) {
                    console.error(`Error running migration ${file}:`, error);
                    process.exit(1);
                }
            }
        }
        console.log("All migrations completed.");
        db_1.default.end();
    });
}
runMigrations();
