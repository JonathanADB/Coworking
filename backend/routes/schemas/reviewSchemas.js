import Joi from "joi";

export const viewReviewSchema = Joi.object({
  reservationId: Joi.string().required(),
});

export const viewReviewByRoomSchema = Joi.object({
  roomId: Joi.string().required(),
});

export const viewReviewByReservationSchema = Joi.object({
  reservationId: Joi.string().required(),
});

export const viewReviewByUserSchema = Joi.object({
  userId: Joi.string().required(),
});

export const viewReviewByReviewIdSchema = Joi.object({
  reviewId: Joi.string().required(),
});

export const addReviewSchema = Joi.object({
  description: Joi.string().optional(),
  rate: Joi.number().integer().min(0).max(5).required(),
  reservationId: Joi.string().required(),
});

export const deleteReviewSchema = Joi.object({
  reviewId: Joi.string().required(),
});

export const updateReviewSchema = Joi.object({
  reviewId: Joi.string().required(),
  rate: Joi.number().integer().min(0).max(5).required(),
  description: Joi.string().optional(),
});
