import Joi from "joi";

export const addMediaAvatarSchema = Joi.object({
  avatarId: Joi.string().required(),
  url: Joi.string().required(),
  userId: Joi.string().required(),
});
