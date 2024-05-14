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
import isAdmin from "../../middleware/isAdmin.js";
import serveStatic from "../../middleware/serveStatic.js";
import { basename, resolve } from 'path';
import { unlinkSync } from 'fs';
import { cwd } from 'process';

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
      
      const [avatar] = await dbPool.execute(
        `SELECT avatar FROM users WHERE id = ?`,
        [userId]
      );

      if (avatar[0].avatar) {
        const avatarUrl = avatar[0].avatar;
        const avatarFileName = basename(avatarUrl);
        const avatarPath = resolve(
          cwd(),
          "..",
          "frontend",
          "public",
          "uploads",
          "avatar",
          avatarFileName
        );
        unlinkSync(avatarPath);
      }
        
      await dbPool.execute(
        `INSERT INTO media(id, url, userId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [avatarId, url, userId, url, avatarId]
      );

      await dbPool.execute(
        `UPDATE users SET avatar = ? WHERE id = ?`,
        [url, userId]
      );

      res.status(201).json({
        message: `Se ha actualizado el avatar correctamente`,
        url: url,
      });
    } catch (err) {
      next(err);
    }
  }
);

mediaRouter.post(
  "/room/:id/media/add-media",
  authenticate,
  isAdmin,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: roomId } = req.params;
      const { API_HOST } = process.env;
      const mediaId = crypto.randomUUID();
      const { fileName } = req.body;

      const url = `${API_HOST}/uploads/media/${fileName}`;

      await dbPool.execute(
        `INSERT INTO media(id, url, roomId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [mediaId, url, roomId, url, mediaId]
      );

      await dbPool.execute(
        `UPDATE rooms SET image = ? WHERE id = ?`,
        [url, roomId]
      );

      res.status(201).json({
        message: `Se ha añadido el archivo correctamente`,
        url: url,
      });
    } catch (err) {
      next(err);
    }
  }
);