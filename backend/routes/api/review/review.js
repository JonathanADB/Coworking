import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../../validations/validateReservationId.js";
import { validateReviewId } from "../../../validations/validateReviewId.js";
import {
  viewReviewSchema,
  viewReviewByUserSchema,
  viewReviewByRoomSchema,
  viewReviewByReservationSchema,
  addReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
  viewReviewByReviewIdSchema,
} from "../../schemas/reviewSchemas.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();

export const reviewRouter = Router();

// Ver reviews
reviewRouter.get("/reviews", async (req, res, next) => {
  try {
    const [reviews] = await pool.execute(
      `
  SELECT 
    reviews.id,
    reviews.rate,
    reviews.description,
    reviews.reservationId,
    reservations.userId,
    reservations.roomId,
    users.firstName,
    users.lastName,
    rooms.name AS roomName
  FROM 
    reviews
  JOIN 
    reservations ON reviews.reservationId = reservations.id
  JOIN 
    users ON reservations.userId = users.id
  JOIN 
    rooms ON reservations.roomId = rooms.id;
`
    );
    if (!reviews) {
      throw createError(404, "Reseñas no encontradas");
    }
    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Listado de reviews por usuario
reviewRouter.get("/reviews/by-userId/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { error } = viewReviewByUserSchema.validate({ userId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews JOIN reservations ON reviews.reservationId = reservations.id WHERE reservations.userId = ?",
      [userId]
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

// Listado de reviews por sala
reviewRouter.get("/reviews/by-roomId/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { error } = viewReviewByRoomSchema.validate({ roomId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews JOIN reservations ON reviews.reservationId = reservations.id WHERE reservations.roomId = ?",
      [roomId]
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

// Listado de reviews por reserva
reviewRouter.get(
  "/reviews/by-reservationId/:reservationId",
  authenticate,
  async (req, res, next) => {
    try {
      const reservationId = req.params.reservationId;
      const { error } = viewReviewByReservationSchema.validate({ reservationId });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const [reviews] = await pool.execute(
        "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews WHERE reviews.reservationId = ?",
        [reservationId]
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
  }
);

//Crear review
reviewRouter.post('/review/create/:reservationId',
 authenticate, 
 async (req, res, next) => {
const { description, rate} = req.body;
const {reservationId} = req.params;
const { error } = addReviewSchema.validate({
    description,
    rate,
    reservationId,
  });

  if (error) {
    throw createError(400, "Datos de entrada no válidos");
  }

  const userId = req.user.id;

  try {
    const [reservation] = await pool.execute(
      `SELECT * FROM reservations WHERE id =? AND userId =?`,
      [reservationId, userId]
    );

    if (!reservation[0]) {
      return res.status(404).json({
        message: "Reserva no encontrada o no pertenece al usuario",
      });
    }

    const roomId = reservation[0].roomId;

    const [existingReview] = await pool.execute(
      "SELECT * FROM reviews WHERE reservationId =?",
      [reservationId]
    );

    if (existingReview.length > 0) {
      throw createError(400, "La review ya existe");
    }

    const reservationCheck = await validateReservationId(reservationId);
    if (!reservationCheck.reservationCheckin) {
      throw createError(400, "Reserva no utilizada");
    }
    const reviewId = crypto.randomUUID()
    await pool.execute(
      "INSERT INTO reviews(id, rate, description, reservationId) VALUES (?,?,?,?)",
      [reviewId, rate, description, reservationId]
    );

    res.status(201).json({
    message: "Review creada correctamente",
    id: reviewId,
    });
  } catch (err) {
    next(err);
  }
});

// Borrar review
reviewRouter.delete(
  "/review/delete/:reviewId",
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
  "/review/edit/:reviewId",
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

// Obtener detalles de una review por su id
reviewRouter.get("/review/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const { error } = viewReviewByReviewIdSchema.validate({ reviewId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [review] = await pool.execute(
      `
      SELECT 
        reviews.id,
        reviews.rate,
        reviews.description,
        reviews.reservationId,
        reservations.userId,
        reservations.roomId,
        users.firstName,
        users.lastName,
        rooms.name AS roomName
      FROM 
        reviews
      JOIN 
        reservations ON reviews.reservationId = reservations.id
      JOIN 
        users ON reservations.userId = users.id
      JOIN 
        rooms ON reservations.roomId = rooms.id
      WHERE 
        reviews.id = ?;
      `,
      [reviewId]
    );
    
    if (!review[0]) {
      throw createError(404, "Review no encontrada");
    }
    res.status(200).json({
      data: review[0],
    });
  } catch (error) {
    next(error);
  }
});

// Verificar si el usuario tiene una reserva que ya pasó la fecha y no ha hecho review

reviewRouter.get("/review/check", authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [reservations] = await pool.execute(
      "SELECT * FROM reservations WHERE userId = ? AND checkin < CURRENT_DATE() AND id NOT IN (SELECT reservationId FROM reviews)",
      [userId]
    );
    if (reservations.length === 0) {
      return res.status(404).json({
        message: "No hay reservas para hacer review",
      });
    }
    res.status(200).json({
      message: "Puede hacer review",
    });
  } catch (err) {
    next(err);
  }
}
);