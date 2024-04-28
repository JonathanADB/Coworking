import { getPool } from "../database/getPool.js";

const pool = getPool();

export async function validateReservationId(reservationId) {
  // Comprobamos y validamos si existe una reserva
  const [[reservation]] = await pool.execute(
    "SELECT * FROM reservations WHERE id = ?",
    [reservationId]
  );
  if (!reservation) {
    throw new Error("Reserva no encontrada");
  }
  return reservation;
}
