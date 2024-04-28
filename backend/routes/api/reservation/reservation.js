import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";

const pool = getPool();

export const reservationRouter = Router();

// Creación de reserva
reservationRouter.post("/rooms/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { userId, reservationDateBeg, reservationDateEnd } = req.body;
    if (!userId || !reservationDateBeg || !reservationDateEnd || !roomId) {
      return res.status(400).json({
        error: "Falta información",
      });
    }
    const [existingReservation] = await pool.execute(
      `SELECT * FROM reservations
            WHERE roomId = ? AND
            (reservationDateBeg <= ? AND reservationDateEnd >= ?) OR
            (reservationDateBeg <= ? AND reservationDateEnd >= ?)`,
      [
        roomId,
        reservationDateBeg,
        reservationDateBeg,
        reservationDateEnd,
        reservationDateEnd,
      ]
    );

    if (existingReservation.length > 0) {
      return res.status(408).json({
        success: false,
        message: "La sala ya esta servada este periodo",
      });
    }
    const reservationsId = crypto.randomUUID();

    await pool.execute(
      `INSERT INTO reservations (id, roomId, userId, reservationDateBeg, reservationDateEnd) VALUES (?,?,?,?,?)`,
      [reservationsId, roomId, userId, reservationDateBeg, reservationDateEnd]
    );
    res.json({
      success: true,
      message: "Reserva realizada con exito",
    });
  } catch (err) {
    next(err);
  }
});

// Cancelación reserva
reservationRouter.delete(
  "/rooms/:roomId/reservations/:reservationId",
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const reservationId = req.params.reservationId;

      if (!roomId || !reservationId) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const [reservation] = await pool.execute(
        `SELECT * FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );

      if (reservation.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Reserva no encontrada",
        });
      }
      await dbPool.execute(
        `DELETE FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );

      res.json({
        success: true,
        message: "Reserva cancelada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);
