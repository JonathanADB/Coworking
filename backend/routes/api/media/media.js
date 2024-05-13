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
      const { fileName } = req.body;

      const url = `${API_HOST}/uploads/avatar/${fileName}`;

      await dbPool.execute(
        `INSERT INTO media(id, url, userId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [avatarId, url, userId, url, avatarId]
      );

      await dbPool.execute(
        `UPDATE users SET avatar = ? WHERE id = ?`,
        [url, userId]
      );

      res.status(201).json({
        success: true,
        message: `Se ha actualizado el avatar correctamente`,
        url: url,
      });
    } catch (err) {
      next(err);
    }
  }
);