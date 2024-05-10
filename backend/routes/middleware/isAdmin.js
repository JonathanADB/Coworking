import { getPool } from "../../database/getPool.js";
import { createError } from "../../utils/error.js";

const pool = getPool();

export async function isAdmin(req, res, next) {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return next(createError(404, "Usuario no encontrado"));

    }

    if (rows[0].role === "admin") {
      next();
    } else {
      return next(createError(403, "El usuario no es administrador"));
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al consultar la base de datos:", error);
    return next(createError(500, "Error interno del servidor"));
  }
}

export default isAdmin;