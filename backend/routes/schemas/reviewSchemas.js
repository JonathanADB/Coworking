import Joi from "joi";

export const viewReviewSchema = Joi.object({
  reviewId: Joi.string().required(),
});

export const addReviewSchema = Joi.object({
  rate: Joi.number().integer().min(0).max(5).required(),
  description: Joi.string().optional(),
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
