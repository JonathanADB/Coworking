import "dotenv/config.js";
import express, { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import { createError } from "../../../utils/error.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import path from "node:path";
import process from "node:process";
import fileUpload from "express-fileupload";
import { addMediaAvatarSchema } from "../../schemas/mediaSchema.js";
import handleFileUpload from "../../middleware/handleFileUpload.js";
import serveStatic from "../../middleware/serveStatic.js";

const dbPool = getPool();
export const mediaRouter = Router();

mediaRouter.use(fileUpload({
  createParentPath: true, 
}));

// Añadir un avatar
mediaRouter.use(fileUpload({
  createParentPath: true, 
}));

// Actualizar el avatar
mediaRouter.post(
  "/user/:id/media/update-avatar",
  authenticate,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      const { API_HOST } = process.env;
      const { fileName } = req.body;

      const [existingMedia] = await dbPool.query(
        `SELECT * FROM media WHERE userId = ?`,
        [userId]
      );

      if (existingMedia) {
        // Si ya existe un archivo de medios asociado al usuario, actualizarlo
        const { id: mediaId } = existingMedia;
        const url = `${API_HOST}/uploads/avatar/${fileName}`;

        await dbPool.execute(
          `UPDATE media SET url = ? WHERE id = ?`,
          [url, mediaId]
        );

        res.status(200).json({
          success: true,
          message: `El avatar se actualizó correctamente`,
          fileName: fileName,
          url: url,
        });
      } else {
        // Si no existe un archivo de medios asociado al usuario, crear uno nuevo
        const avatarId = crypto.randomUUID();
        const url = `${API_HOST}/uploads/avatar/${fileName}`;

        await dbPool.execute(
          `INSERT INTO media(id, url, userId) VALUES (?, ?, ?)`,
          [avatarId, url, userId]
        );

        await dbPool.execute(
          `UPDATE users SET avatar = ? WHERE id = ?`,
          [url, userId]
        );

        res.status(201).json({
          success: true,
          message: `El avatar se añadió correctamente`,
          fileName: fileName,
          url: url,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);
