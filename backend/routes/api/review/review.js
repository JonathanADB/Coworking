import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../../validations/validateReservationId.js";
import { validateReviewId } from "../../../validations/validateReviewId.js";
import {
  viewReviewSchema,
  addReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
} from "../../schemas/reviewSchemas.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();

export const reviewRouter = Router();

// Ver reviews
reviewRouter.get("/reviews", async (req, res, next) => {
  try {
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate , reviews.description, reviews.reservationId FROM reviews"
    );
    if (!reviews) {
      throw createError(404, "Reviews no encontradas");
    }
    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Ver review por id
reviewRouter.get("/review/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const { error } = viewReviewSchema.validate({ reviewId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const review = await validateReviewId(reviewId);
    res.status(200).json({
      message: review,
    });
  } catch (error) {
    next(error);
  }
});

// Agregar review
reviewRouter.post("/review/add", authenticate, async (req, res, next) => {
  try {
    const { rate, description, reservationId } = req.body;
    const { error } = addReviewSchema.validate({
      rate,
      description,
      reservationId,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [[review]] = await pool.execute(
      "SELECT * FROM reviews WHERE reservationId = ?",
      [reservationId]
    );
    if (review) {
      throw createError(400, "La review ya existe");
    }
    const reservation = await validateReservationId(reservationId);
    if (!reservation.reservationCheckin) {
      throw createError(400, "Reserva no utilizada");
    }
    await pool.execute(
      "INSERT INTO reviews(id, rate, description, reservationId) VALUES (?, ?, ?, ?)",
      [crypto.randomUUID(), rate, description, reservationId]
    );
    res.status(201).json({
      message: "Review creada correctamente",
    });
  } catch (err) {
    next(err);
  }
});

// Borrar review
reviewRouter.delete(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const { error } = deleteReviewSchema.validate({ reviewId });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const review = await validateReviewId(reviewId);
      await pool.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);
      res.status(200).json({
        message: "Review eliminada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Editar review
reviewRouter.patch(
  "/review/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const { rate, description } = req.body;
      const { error } = updateReviewSchema.validate({
        reviewId,
        rate,
        description,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const review = await validateReviewId(reviewId);
      await pool.execute(
        "UPDATE reviews SET rate = ?, description = ?, updatedAt = CURRENT_TIME() WHERE id = ?",
        [
          rate ? rate : review.rate,
          description ? description : review.description,
          reviewId,
        ]
      );
      res.status(200).json({
        message: "Review modificada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);
