import "dotenv/config.js";
import express, { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import { createError } from "../../../utils/error.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import path from "node:path";
import process from "node:process";
import fileUpload from "express-fileupload";
import { addMediaAvatarSchema } from "../../schemas/mediaSchema.js";

const dbPool = getPool();
const fileUploadMiddleware = fileUpload({
  limits: {
    fileSize: 10000000,
  },
  abortOnLimit: true,
});
const staticPublicAvatarMiddleware = express.static("public/avatar");

export const mediaRouter = Router();

// Añadir un avatar
mediaRouter.post(
  "/user/:id/media/add-avatar",
  authenticate,
  fileUploadMiddleware,
  staticPublicAvatarMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.params.id;
      const { API_HOST } = process.env;
      const avatarId = crypto.randomUUID();
      const { image } = req.files;
      const { error } = addMediaAvatarSchema.validate({
        avatarId,
        url,
        userId,
      });
      console.log(process.cwd());
      if (error) throw createError(400, "Datos de entrada no válidos");
      if (!image) throw createError(400, error);
      if (!/^image/.test(image.mimetype)) throw createError(400, error);

      const fileExtension = path.extname(image.name);
      const generatedFileName = crypto.randomUUID();

      const filePath = `media/${generatedFileName}${fileExtension}`;

      const url = `${API_HOST}/${filePath}`;
      const publicFolder = path.join(process.cwd(), "public/avatar");

      console.log(avatarId);
      console.log(url);
      console.log(userId);

      const add = await dbPool.execute(
        `INSERT INTO media(id, url, userId) VALUES (?, ?, ?)`,
        [avatarId, url, userId]
      );

      await image.mv(url + publicFolder + image.name, (err) => {
        if (err) {
          throw createError(500, err);
        }

        res.json({
          success: true,
          message: `La subida del archivo se añadió correctamente`,
        });
      });

      if (!add) throw createError(401, "No se ha podido subir el archivo");
    } catch (err) {
      next(err);
    }
  }
);
