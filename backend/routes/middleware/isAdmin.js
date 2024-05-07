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
      throw createError(404,  "Usuario no encontrado" ); // El usuario no existe en la base de datos
    }

    if (rows[0].role === 'admin') {
      next(); // El usuario es admin, pasa al siguiente middleware
    } else {
      throw createError(403, "El usuario no es administrador" ); // El usuario no es admin
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al consultar la base de datos:", error);
    throw createError(500,"El usuario no es administrador" );
  }
}

export default isAdmin;
