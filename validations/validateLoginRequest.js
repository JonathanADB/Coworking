import { getPool } from "../database/getPool.js";
import { compare } from "bcrypt";

const dbpool = getPool();

export async function validateLoginRequest({ username, email, password }) {
  const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
  const [rows] = await dbpool.execute(query, [
    username || email,
    username || email,
  ]);
  if (rows.length === 0) {
    throw new Error("Username o email incorrecto");
  }
  const user = rows[0];
  if (password != user.password) {
    throw new Error("Password incorrecto");
  }
  return user;
}
