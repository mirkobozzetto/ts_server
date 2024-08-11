import { Pool } from "pg";

const pool = new Pool({
	user: "mirkobozzetto",
	host: "localhost",
	database: "ts_server",
	password: "mysecretpassword",
	port: 5432,
});

export default pool;
