import { Router } from "express";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { getPool } from "../../../database/getPool.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  querySchema,
  incidentSchema,
  paramsSchema,
} from "../../schemas/incidentSchemas.js";
import { createError } from "../../../utils/error.js";

const dbPool = getPool();

export const categoryIncidentsRouter = Router();

//Agregar una incidencia como Admin
categoryIncidentsRouter.post(
  "/:userId/:roomId/incidents/add",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { error } = incidentSchema.validate(req.body);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const { description, equipmentId } = req.body;
      await dbPool.execute(
        `INSERT INTO incidents (id, description, userId, roomId, equipmentId) VALUE (?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          description,
          req.user.id,
          req.params.roomId,
          equipmentId,
        ]
      );
      res.json({
        success: true,
        message: "Incidencia transmitida con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

//Agregar una incidencia como usuario
categoryIncidentsRouter.post(
  "/:roomId/incidents/add",
  authenticate,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const roomId = req.params.roomId;
      const { error } = incidentSchema.validate(req.body);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const { description, equipmentId } = req.body;
      await dbPool.execute(
        `INSERT INTO incidents (id, description,userId, roomId, equipmentId) VALUE (?, ?, ?, ?, ?)`,
        [crypto.randomUUID(), description, userId, roomId, equipmentId]
      );
      res.json({
        success: true,
        message: "Incidencia transmitida con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

export const listIncidentsRouter = Router();

//Lista de incidencias (Admin)
listIncidentsRouter.get(
  "/incidents",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { error } = querySchema.validate(req.query);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const offset = req.query.offset || 0;
      const [totalIncidents] = await dbPool.execute(
        `SELECT incidents.id AS incidentId, incidents.description, users.id AS userId, rooms.id AS roomId, equipment.id AS equipmentId, incidents.createdAt, incidents.updatedAt
        FROM incidents
        JOIN users
          ON users.id = incidents.userId
        JOIN rooms
          ON rooms.id = incidents.roomId
        JOIN equipment
          ON equipment.id = incidents.equipmentId
        ORDER BY incidents.createdAt DESC, incidents.updatedAt DESC 
        LIMIT 10 OFFSET ${offset}`
      );
      res.status(200).json(totalIncidents);
    } catch (err) {
      next(err);
    }
  }
);

//Lista de incidencias
categoryIncidentsRouter.get(
  "/incidents/:incidentId",
  async (req, res, next) => {
    try {
      const { error } = paramsSchema.validate(req.params);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const incidentId = req.params.incidentId;
      const [incident] = await dbPool.execute(
        `SELECT incidents.id, incidents.description, users.userName, rooms.name, equipment.name
      FROM incidents
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      WHERE incidents.id=?`,
        [incidentId]
      );
      if (incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }
      res.json(incident[0]);
    } catch (err) {
      next(err);
    }
  }
);