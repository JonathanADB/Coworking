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
mediaRouter.post(
  "/user/:id/media/add-avatar",
  authenticate,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      const { API_HOST } = process.env;
      const avatarId = crypto.randomUUID();
      const { fileName, filePath } = req.body;

      const url = `${API_HOST}/uploads/${fileName}`;

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
        message: `La subida del archivo se añadió correctamente`,
        fileName: fileName,
      });
    } catch (err) {
      next(err);
    }
  }
);