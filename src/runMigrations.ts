import fs from "fs";
import path from "path";
import pool from "./db";

async function runMigrations() {
	const migrationsDir = path.join(__dirname, "..", "migrations");
	const migrationFiles = fs.readdirSync(migrationsDir).sort();

	for (const file of migrationFiles) {
		if (path.extname(file) === ".sql") {
			const filePath = path.join(migrationsDir, file);
			const sql = fs.readFileSync(filePath, "utf-8");

			console.log(`Running migration: ${file}`);
			try {
				await pool.query(sql);
				console.log(`Migration ${file} completed successfully.`);
			} catch (error) {
				console.error(`Error running migration ${file}:`, error);
				process.exit(1);
			}
		}
	}

	console.log("All migrations completed.");
	pool.end();
}

runMigrations();
