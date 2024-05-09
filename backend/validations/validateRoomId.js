import { getPool } from "../database/getPool.js";
import { createError } from "../utils/error.js";

const pool = getPool();

export async function validateRoomId(roomId) {
  // Comprobamos y validamos si existe una review
  const [[room]] = await pool.execute("SELECT * FROM rooms WHERE id = ?", [
    roomId,
  ]);
  if (!room) {
    throw createError(404, "Espacio no encontrado");
  }
  return room;
}
