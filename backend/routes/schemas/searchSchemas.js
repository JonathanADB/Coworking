import Joi from "joi";

export const searchRoomTypeOfSchema = Joi.object({
  typeOf: Joi.string().required(),
});

export const searchEquipmentSchema = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  search: Joi.string().allow("").optional(),
});

export const searchReservationsSchema = Joi.object({
  roomId: Joi.string().required(),
  dateBeg: Joi.date().required(),
  dateEnd: Joi.date().required(),
});
