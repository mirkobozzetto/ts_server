import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema";

const pool = new Pool({
	user: "mirkobozzetto",
	host: "localhost",
	database: "ts_server",
	password: "mysecretpassword",
	port: 5432,
});

export const db = drizzle(pool, { schema });

export const pgPool = pool;
