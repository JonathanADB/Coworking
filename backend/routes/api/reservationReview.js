import { Router, json } from "express";
import { getPool } from "../../database/getPool.js";
import authenticate from "../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../validations/validateReservationId.js";
import { validateReviewId } from "../../validations/validateReviewId.js";

const pool = getPool();

export const reservationReview = Router();

reservationReview.post("/review/add", authenticate, async (req, res, next) => {
  try {
    // Extraemos el body de la petición
    const { rate, description, reservationId } = req.body;
    // Comprobamos y validamos si ya existe una review para la reserva indicada
    const [[review]] = await pool.execute(
      "SELECT * FROM reviews WHERE reservationId = ?",
      [reservationId]
    );
    if (review) {
      throw new Error("Review already exist");
    }
    // Comprobamos y validamos si ya existe una reserva para la id indicada
    const { reservation } = validateReservationId(reservationId);
    // Insertamos la review en la DB
    await pool.execute(
      "INSERT INTO reviews(id, rate, description, reservationId) VALUES (?, ?, ?, ?)",
      [crypto.randomUUID(), rate, description, reservationId]
    );
    res.json({
      success: true,
      message: "Review creada correctamente",
    });
  } catch (err) {
    next(err);
  }
});

reservationReview.delete(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      // Extraemos la id de la review de los parámetros de la petición
      const reviewId = req.params.reviewId;
      // Comprobamos y validamos si ya existe una review para la id indicada
      const { review } = validateReviewId(reviewId);
      // Eliminamos la review de la DB
      await pool.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);
      res.json({
        success: true,
        message: "Review eliminada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);

reservationReview.patch(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      // Extraemos la id de la review de los parámetros de la petición
      const reviewId = req.params.reviewId;
      // Extraemos el body de la petición
      const { rate, description } = req.body;
      // Comprobamos y validamos si ya existe una review para la id indicada
      const { review } = validateReviewId(reviewId);
      // Actualizamos la review de la DB
      await pool.execute(
        "UPDATE reviews SET rate = ?, description = ?, updatedAt = CURRENT_TIME() WHERE id = ?",
        [
          rate ? rate : review.rate,
          description ? description : review.description,
          reviewId,
        ]
      );
      res.json({
        success: true,
        message: "Review modificada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);
