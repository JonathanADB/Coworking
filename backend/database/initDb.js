import "dotenv/config.js";

import { createConnection } from "mysql2/promise.js";
import { dbSchema } from "./dbSchema.js";
import { loadBaseData } from "./loadBaseData.js";

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const db = await createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

await dbSchema(db);

await loadBaseData(db);

await db.end();