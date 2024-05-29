import Joi from "joi";

export const searchRoomTypeOfSchema = Joi.object({
  typeOf: Joi.string().required(),
});

export const searchFiltersSchema = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  search: Joi.string().allow("").optional(),
  limit: Joi.number().integer().min(10).max(100).optional(),
  direction: Joi.string().optional(),
});

export const searchReservationsSchema = Joi.object({
  roomId: Joi.string().required(),
  dateBeg: Joi.date().required(),
  dateEnd: Joi.date().required(),
});
