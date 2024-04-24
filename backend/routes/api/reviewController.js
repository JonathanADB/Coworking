import { Router, json } from "express";
import { getPool } from "../../database/getPool.js";
import authenticate from "../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../validations/validateReservationId.js";
import { validateReviewId } from "../../validations/validateReviewId.js";

const pool = getPool();

export const reviewController = Router();

reviewController.get("/reviews", async (req, res, next) => {
  try {
    // Consultamos las reviews almacenadas en la DB
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate , reviews.description, reviews.reservationId FROM reviews"
    );
    if (!reviews) {
      throw new Error("Reviews not found");
    }
    res.json({
      success: true,
      message: reviews,
    });
  } catch (error) {
    next(error);
  }
});

reviewController.get("/review/:reviewId", async (req, res, next) => {
  try {
    // Extraemos la id de la review de los parámetros de la petición
    const reviewId = req.params.reviewId;
    // Consultamos la review en la BD
    const review = await validateReviewId(reviewId);
    res.json({
      success: true,
      message: review,
    });
  } catch (error) {
    next(error);
  }
});

reviewController.post("/review/add", authenticate, async (req, res, next) => {
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
    const reservation = await validateReservationId(reservationId);
    // Comprobamos si la reserva ha sido utilizada
    if (!reservation.reservationCheckin) {
      throw new Error("Reservation not used");
    }
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

reviewController.delete(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      // Extraemos la id de la review de los parámetros de la petición
      const reviewId = req.params.reviewId;
      // Comprobamos y validamos si ya existe una review para la id indicada
      const review = await validateReviewId(reviewId);
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

reviewController.patch(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      // Extraemos la id de la review de los parámetros de la petición
      const reviewId = req.params.reviewId;
      // Extraemos el body de la petición
      const { rate, description } = req.body;
      // Comprobamos y validamos si ya existe una review para la id indicada
      const review = await validateReviewId(reviewId);
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
