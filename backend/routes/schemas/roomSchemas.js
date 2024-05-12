import Joi from "joi";

export const addRoomSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  capacity: Joi.number().integer().min(0).max(255).required(),
  typeOf: Joi.string().required(),
});

export const updateRoomSchema = Joi.object({
  roomId: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  capacity: Joi.number().integer().min(0).max(255).optional(),
  typeOf: Joi.string().optional(),
});

export const viewRoomSchema = Joi.object({
  roomId: Joi.string().required(),
});