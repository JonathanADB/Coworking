import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
  avatar: Joi.optional(),
  role: Joi.string().optional(),
});

export const validateSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

export const profileSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  avatar: Joi.optional(),
});

export const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
