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
import { promises as fs } from "fs";
import { dirname, resolve, basename } from "path";
import { cwd } from "process";

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

//Eliminar un espacio (admin)
roomRouter.delete(
  "/room/:id",
  authenticate,
  isAdmin, async (req, res, next) => {
    try {
      const roomId = req.params.id;
      const { error } = viewRoomSchema.validate({ roomId });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const room = await validateRoomId(roomId);
      await dbPool.execute("DELETE FROM rooms WHERE id = ?", [roomId]);
      res.status(200).json({
        message: "Espacio eliminado correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint para obtener todos los espacios
roomRouter.get("/rooms", async (req, res, next) => {
  try {
    const [rooms] = await dbPool.execute(
      `
      SELECT 
        rooms.id, 
        rooms.name, 
        rooms.description, 
        rooms.capacity, 
        rooms.typeOf, 
        rooms.image,
        AVG(reviews.rate) as averageRate
      FROM 
        rooms
      LEFT JOIN 
        reservations ON rooms.id = reservations.roomId
      LEFT JOIN 
        reviews ON reservations.id = reviews.reservationId
      GROUP BY 
        rooms.id;
      `
    );

    if (!rooms || rooms.length === 0) {
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
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const { error } = viewRoomSchema.validate({ roomId });

      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const room = await validateRoomId(roomId);
      if (!room) {
        throw createError(404, "Room not found");
      }

      const roomPath = resolve(
        cwd(),
        "..",
        "frontend",
        "public",
        "uploads",
        "rooms",
        room.id
      );

      let filteredFiles = [];
      try {
        const files = await fs.readdir(roomPath);
        filteredFiles = files.filter(file =>
          file.endsWith('.png') ||
          file.endsWith('.jpg') ||
          file.endsWith('.jpeg') ||
          file.endsWith('.webp')
        );
      } catch (error) {
        console.log(error);
        filteredFiles = [];
      }

      let averageRate = null;
      try {
        const [result] = await dbPool.execute(
          `
          SELECT AVG(reviews.rate) as averageRate
          FROM reviews
          JOIN reservations ON reviews.reservationId = reservations.id
          WHERE reservations.roomId = ?;
          `,
          [roomId]
        );
        if (result.length > 0 && result[0].averageRate !== null) {
          averageRate = parseFloat(result[0].averageRate);
        }
      } catch (error) {
        console.log(error);
        averageRate = null;
      }

      let equipment = [];
      try {
        const [equipmentResult] = await dbPool.execute(
          `
          SELECT equipment.id, equipment.name, equipment.description 
          FROM equipmentRooms 
          JOIN equipment ON equipmentRooms.equipmentId = equipment.id 
          WHERE equipmentRooms.roomId = ?`,
          [roomId]
        );
        equipment = equipmentResult;
      } catch (error) {
        console.log(error);
        equipment = [];
      }

      res.status(200).json({
        message: {
          ...room,
          averageRate: averageRate,
          images: filteredFiles,
          equipment: equipment
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Listado del equipo de un espacio
roomRouter.get(
  "/rooms/:roomId/equipment",
  authenticate,
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      // const { error } = viewRoomSchema.validate({ roomId });
      // if (error) {
      //   throw createError(400, "Datos de entrada no válidos");
      // }

      const [equipment] = await dbPool.execute(
        `SELECT equipment.id, equipment.name, equipment.description FROM equipmentRooms JOIN equipment ON equipmentRooms.equipmentId = equipment.id WHERE equipmentRooms.roomId = ?`,
        [roomId]
      );

      if (!equipment) {
        throw createError(404, "Equipo no encontrado");
      }
      res.status(200).json({
        equipment,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Añadir equipo a un espacio
roomRouter.post(
  "/rooms/:roomId/equipment",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    const { roomId } = req.params;
    const { equipmentIds } = req.body;

    if (!Array.isArray(equipmentIds)) {
      return res.status(400).json({ error: 'equipmentIds debe ser un array de IDs de equipos.' });
    }

    const values = equipmentIds.map(equipmentId => [
      crypto.randomUUID(), 
      equipmentId, 
      roomId, 
      new Date(), 
      new Date()
    ]);

    const deletePreviousRows = `
      DELETE FROM equipmentRooms
      WHERE roomId = ?
    `;

    const updateRows = `
      INSERT INTO equipmentRooms (id, equipmentId, roomId, createdAt, updatedAt)
      VALUES ?
    `;

    try {
      await dbPool.query(deletePreviousRows, [roomId]);

      if (equipmentIds.length > 0) {
        const values = equipmentIds.map(equipmentId => [
          crypto.randomUUID(), 
          equipmentId, 
          roomId, 
          new Date(), 
          new Date()
        ]);
        const [result] = await dbPool.query(updateRows, [values]);
        return res.status(201).json({ message: 'Equipos añadidos a la sala con éxito.', result });
      } else {
        return res.status(204).json({ message: 'Equipos eliminados de la sala, sin nuevos equipos añadidos.' });
      }
    } catch (error) {
      console.error('Error al añadir equipos a la sala:', error);
      res.status(500).json({ error: 'Hubo un error al añadir los equipos a la sala.' });
    }
  }
);