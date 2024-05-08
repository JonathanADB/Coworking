import { getPool } from "../database/getPool.js";
import { compare } from "bcrypt";
import { createError } from "../utils/error.js";

const dbpool = getPool();

export async function validateLoginRequest({ username, email, password }) {
  const query = `SELECT * FROM users WHERE username = ? OR email = ?`;

  const [rows] = await dbpool.execute(query, [
    username || email,
    username || email,
  ]);
  if (rows.length === 0) {
    throw createError(404, "Username y/o email no encontrado/s");
  }
  const user = rows[0];
  const isValid = await compare(password, user.password);

  if (!isValid) {
    throw createError(402, "Contraseña invalida");
  }

  return user;
}
