import Joi from "joi";

export const addRoomSchema = Joi.object({
  name: Joi.string().required,
  description: Joi.string().required(),
  capacity: Joi.number().integer().min(0).max(255).required(),
  typeOf: Joi.string().required(),
});

export const updateRoomSchema = Joi.object({
  roomId: Joi.string().required(),
  name: Joi.string().required,
  description: Joi.string().required(),
  capacity: Joi.number().integer().min(0).max(255).required(),
  typeOf: Joi.string().required(),
});

export const viewRoomSchema = Joi.object({
  roomId: Joi.string().required(),
});
