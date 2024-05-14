import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import isAdmin from "../../middleware/isAdmin.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateRoomId } from "../../../validations/validateRoomId.js";
import {
  addRoomSchema,
  updateRoomSchema,
  viewRoomSchema,
} from "../../schemas/roomSchemas.js";
import { createError } from "../../../utils/error.js";
import crypto from "crypto";

const dbPool = getPool();

export const roomRouter = Router();

// Endpoint creación de un espacio con nombre, desc, etc (admin)
roomRouter.post(
  "/create-room",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { name, description, capacity, typeOf } = req.body;
      const { error } = addRoomSchema.validate(req.body);

      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const roomsId = crypto.randomUUID();
      await dbPool.execute(
        `INSERT INTO rooms(id, name, description, capacity, typeOf) VALUES (?, ?, ?, ?, ?)`,
        [roomsId, name, description, capacity, typeOf]
      );
      res.status(201).json({
        message: "Espacio agregado correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);

//Actualizacion de datos de un espacio (Update Admin)
roomRouter.put("/room/:id", authenticate, isAdmin, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const { name, description, capacity, typeOf } = req.body;
    const { error } = updateRoomSchema.validate({
      roomId,
      name,
      description,
      capacity,
      typeOf,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const room = await validateRoomId(roomId);
    await dbPool.execute(
      `UPDATE rooms SET name=?, description=?, capacity=?, typeOf=?, updatedAt=CURRENT_TIME()
      WHERE id=?`,
      [
        name ? name : room.name,
        description ? description : room.description,
        capacity ? capacity : room.capacity,
        typeOf ? typeOf : room.typeOf,
        roomId,
      ]
    );
    res.status(200).json({
      message: "Espacio actualizada correctamente",
    });
  } catch (err) {
    next(err);
  }
});

// Endpoint para obtener todos los espacios
roomRouter.get("/rooms", authenticate, async (req, res, next) => {
  try {
    const [rooms] = await dbPool.execute(
      "SELECT rooms.id, rooms.name, rooms.description, rooms.capacity, rooms.typeOf FROM rooms"
    );
    if (!rooms) {
      throw createError(404, "Espacios no encontrados");
    }
    res.status(200).json({
      message: rooms,
    });
  } catch (err) {
    next(err);
  }
});

roomRouter.get(
  "/room/:roomId",
  authenticate,
  async (req, res, next) => {
    try {
      // Extraemos la id de la room de los parámetros de la petición
      const roomId = req.params.roomId;
      const { error } = viewRoomSchema.validate({
        roomId,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      // Consultamos el espacio en la BD
      const room = await validateRoomId(roomId);
      res.status(200).json({
        message: room,
      });
    } catch (error) {
      next(error);
    }
  }
);