import  mysql  from "mysql2/promise";
import "dotenv/config.js";

const { DB_HOST, DB_PORT, DB_USER, DB_PASS,DB_NAME} = process.env;

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,

    });
  }
  return pool;
};