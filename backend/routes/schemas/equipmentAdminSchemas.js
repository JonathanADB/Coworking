import Joi from "joi";

export const addEquipmentSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateEquipmentSchema = Joi.object({
  equipmentId: Joi.string().required(),
});

export const deleteEquipmentSchema = Joi.object({
  equipmentId: Joi.string().required(),
});

export const searchEquipmentSchema = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  search: Joi.string().allow("").optional(),
});
