import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../../validations/validateReservationId.js";
import { validateReviewId } from "../../../validations/validateReviewId.js";

const pool = getPool();

export const reviewController = Router();

// Agregar review
reviewController.post("/review/add", authenticate, async (req, res, next) => {
    try {
      const { rate, description, reservationId } = req.body;

      const [[review]] = await pool.execute(
        "SELECT * FROM reviews WHERE reservationId = ?",
        [reservationId]
      );
      if (review) {
        throw new Error("Esta Review ya existe");
      }

      const reservation = await validateReservationId(reservationId);

      if (!reservation.reservationCheckin) {
        throw new Error("Reservación no Usada");
      }
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

// Ver reviews hechas
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
        data : reviews,
      });
    } catch (error) {
      next(error);
    }
  });

// Ver review por id
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

//borra review
reviewController.delete("/review/:reviewId",authenticate, async (req, res, next) => {
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

// editar review
reviewController.patch("/review/:reviewId",authenticate,async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId;
        const { rate, description } = req.body;
        const review = await validateReviewId(reviewId);
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
  