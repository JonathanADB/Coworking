import Joi from "joi";

export const viewUserReservationsSchema = Joi.object({
  userId: Joi.string().required(),
});

export const addReservationSchema = Joi.object({
  roomId: Joi.string().required(),
  reservationDateBeg: Joi.date().required(),
  reservationDateEnd: Joi.date().required(),
});

export const deleteReservationSchema = Joi.object({
  roomId: Joi.string().required(),
  reservationId: Joi.string().required(),
});
