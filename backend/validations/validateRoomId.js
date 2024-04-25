import { getPool } from "../database/getPool.js";

const pool = getPool();

export async function validateRoomId(roomId) {
  // Comprobamos y validamos si existe una review
  const [[room]] = await pool.execute("SELECT * FROM rooms WHERE id = ?", [
    roomId,
  ]);
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
}
