import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().required(),
  email: Joi.string().pattern(new RegExp("@")).required(),
  password: Joi.string().pattern(new RegExp("(?=.*[A-Z])")).required(),
  avatar: Joi.optional(),
  role: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().pattern(new RegExp("@")).optional(),
  password: Joi.string().pattern(new RegExp("(?=.*[A-Z])")).required(),
});

export const validateSchema = Joi.object({
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
  currentPassword: Joi.string().pattern(new RegExp('(?=.*[A-Z])')).required(),
  newPassword: Joi.string().pattern(new RegExp('(?=.*[A-Z])')).required(),
  confirmPassword: Joi.string().pattern(new RegExp('(?=.*[A-Z])')).required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  verification_code: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});
