import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import {
  viewUserReservationsSchema,
  addReservationSchema,
  deleteReservationSchema,
} from "../../schemas/reservationSchemas.js";
import isAdmin from "../../middleware/isAdmin.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();

export const reservationRouter = Router();

// Listado de reservas de un usuario
reservationRouter.get(
  "/reservations/:userId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { error } = viewUserReservationsSchema.validate({
        userId,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const [reviews] = await pool.execute(
        "SELECT * FROM reservations WHERE userId = ?",
        [userId]
      );
      if (!reviews) {
        throw createError(404, "Reservas no encontradas");
      }
      res.status(200).json({
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Creación de reserva
reservationRouter.post(
  "/room/:roomId",
  authenticate,
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const { reservationDateBeg, reservationDateEnd } = req.body;
      const { error } = addReservationSchema.validate({
        roomId,
        reservationDateBeg,
        reservationDateEnd,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
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
        throw createError(
          404,
          "La sala ya está completa para las fechas seleccionadas"
        );
      }
      const reservationsId = crypto.randomUUID();
      await pool.execute(
        `INSERT INTO reservations (id, roomId, userId, reservationDateBeg, reservationDateEnd) VALUES (?,?,?,?,?)`,
        [reservationsId, roomId, userId, reservationDateBeg, reservationDateEnd]
      );
      res.status(201).json({
        message: "Reserva realizada con exito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Cancelación reserva
reservationRouter.delete(
  "/rooms/:roomId/reservations/:reservationId",
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const reservationId = req.params.reservationId;
      const { error } = deleteReservationSchema.validate({
        roomId,
        reservationId,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const [reservation] = await pool.execute(
        `SELECT * FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );
      if (reservation.length === 0) {
        throw createError(404, "Reserva no encontrada");
      }
      await pool.execute(
        `DELETE FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );
      res.status(200).json({
        message: "Reserva cancelada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);