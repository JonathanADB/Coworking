import { getPool } from "../database/getPool.js";
import { createError } from "../utils/error.js";

const pool = getPool();

export async function validateReservationId(reservationId) {
  // Comprobamos y validamos si existe una reserva
  const [[reservation]] = await pool.execute(
    "SELECT * FROM reservations WHERE id = ?",
    [reservationId]
  );
  if (!reservation) {
    throw createError(404, "Reserva no encontrada");
  }
  return reservation;
}
