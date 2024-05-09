import Joi from "joi";

export const querySchema = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
});

export const incidentSchema = Joi.object({
  description: Joi.string().required(),
  equipmentId: Joi.string().required(),
});

export const paramsSchema = Joi.object({
  incidentId: Joi.string().required(),
});
