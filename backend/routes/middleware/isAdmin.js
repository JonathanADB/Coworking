import { getPool } from "../../database/getPool.js";

const pool = getPool();

export async function isAdmin(req, res, next) {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" }); // El usuario no existe en la base de datos
    }

    if (Buffer.compare(rows[0].admin, Buffer.from([1])) === 0) {
      next(); // El usuario es admin, pasa al siguiente middleware
    } else {
      return res.status(403).json({ error: "El usuario no es administrador" }); // El usuario no es admin
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al consultar la base de datos:", error);
    return res.status(500).json({ error: "El usuario no es administrador" });
  }
}

export default isAdmin;
