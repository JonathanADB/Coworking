import Joi from "joi";

export const querySchema = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
});

export const incidentSchema = Joi.object({
  userId: Joi.string().required(),
  roomId: Joi.string().required(),
  description: Joi.string().required(),
  equipmentId: Joi.string().required(),
});

export const paramsSchema = Joi.object({
  incidentId: Joi.string().required(),
});
