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
      res.status(201).json({
        message: "Incidencia transmitida con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

//Agregar una incidencia como usuario
categoryIncidentsRouter.post(
  "/:userId/:roomId/incidents/add",
  authenticate,
  async (req, res, next) => {
    const userId = req.params.userId;
    const roomId = req.params.roomId;

    if (req.user.id !== userId) {
      return res.status(401).json({
        message: "No tienes permisos para realizar esta acción",
      });
    }

    const { error } = incidentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const { description, equipmentId } = req.body;

      const addIncident = await dbPool.execute(
        `INSERT INTO incidents (id, description,userId, roomId, equipmentId) VALUE (?, ?, ?, ?, ?)`,
        [crypto.randomUUID(), description, userId, roomId, equipmentId]
      );

      res.status(201).json({
        message: "Incidencia transmitida con éxito",
      });

      if (!addIncident)
        throw createError(401, "No se pudo añadir la incidencia");
    } catch (err) {
      err.status = 401;
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
        `SELECT incidents.id AS incidentId, incidents.description, incidents.status, users.id AS userId, rooms.id AS roomId, rooms.name AS roomName, equipment.id AS equipmentId, equipment.name AS equipmentName, incidents.createdAt, incidents.updatedAt
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

// Lista de incidencias
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
        `SELECT incidents.id, incidents.description, users.userName, rooms.name, equipment.name, inciden
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
      res.status(200).json(incident[0]);
    } catch (err) {
      next(err);
    }
  }
);

//Lista de incidencias por usuario
categoryIncidentsRouter.get(
  "/incidents/by-userid/:userId",
  authenticate,
  async (req, res, next) => {
    const userId = req.params.userId;
    if (req.user.id !== userId) {
      return res.status(401).json({
        message: "No tienes permisos para realizar esta acción",
      });
    }

    try {
      const [incidents] = await dbPool.execute(
        `SELECT incidents.id, incidents.description, incidents.createdAt, users.userName, rooms.name as roomName, equipment.name as equipmentName
      FROM incidents
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      WHERE incidents.userId=?`,
        [userId]
      );
      res.status(200).json(incidents);
    } catch (err) {
      next(err);
    }
  }
);

// Lista de incidencias por sala
categoryIncidentsRouter.get(
  "/incidents/by-roomid/:roomId",
  authenticate,
  async (req, res, next) => {
    const roomId = req.params.roomId;

    try {
      const [incidents] = await dbPool.execute(
        `SELECT incidents.id, incidents.description, incidents.createdAt, users.userName, rooms.name as roomName, equipment.name as equipmentName
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      WHERE incidents.roomId=?`,
        [roomId]
      );
      res.status(200).json(incidents);
    } catch (err) {
      next(err);
    }
  }
);

// Lista de incidencias por equipo
categoryIncidentsRouter.get(
  "/incidents/by-equipmentid/:equipmentId",
  authenticate,
  async (req, res, next) => {
    const equipmentId = req.params.equipmentId;

    try {
      const [incidents] = await dbPool.execute(
        `SELECT incidents.id, incidents.description, incidents.createdAt, users.userName, rooms.name as roomName, equipment.name as equipmentName
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      WHERE incidents.equipmentId=?`,
        [equipmentId]
      );
      res.status(200).json(incidents);
    } catch (err) {
      next(err);
    }
  }
);

// Modificar incidencia creada por un usuario
categoryIncidentsRouter.put(
  "/incidents/:incidentId",
  authenticate,
  async (req, res, next) => {
    const incidentId = req.params.incidentId;

    try {
      const [incident] = await dbPool.execute(
        `SELECT *
      FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }

      if (req.user.id !== incident[0].userId) {
        return res.status(401).json({
          message: "No tienes permisos para realizar esta acción",
        });
      }

      const { description, equipmentId } = req.body;

      const updateIncident = await dbPool.execute(
        `UPDATE incidents
      SET description=?, equipmentId=?
      WHERE id=?`,
        [description, equipmentId, incidentId]
      );

      if (!updateIncident) {
        throw createError(401, "No se pudo modificar la incidencia");
      }

      res.status(200).json({
        message: "Incidencia modificada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Modificar incidencia como Admin
categoryIncidentsRouter.put(
  "/incidents/:incidentId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    const incidentId = req.params.incidentId;

    try {
      const [incident] = await dbPool.execute(
        `SELECT *
      FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }

      const { description, equipmentId } = req.body;

      const updateIncident = await dbPool.execute(
        `UPDATE incidents
      SET description=?, equipmentId=?
      WHERE id=?`,
        [description, equipmentId, incidentId]
      );

      if (!updateIncident) {
        throw createError(401, "No se pudo modificar la incidencia");
      }

      res.status(200).json({
        message: "Incidencia modificada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Eliminar incidencia creada por un usuario
categoryIncidentsRouter.delete(
  "/incidents/:incidentId",
  authenticate,
  async (req, res, next) => {
    const incidentId = req.params.incidentId;

    try {
      const [incident] = await dbPool.execute(
        `SELECT *
      FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }

      if (req.user.id !== incident[0].userId) {
        return res.status(401).json({
          message: "No tienes permisos para realizar esta acción",
        });
      }

      const deleteIncident = await dbPool.execute(
        `DELETE FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (!deleteIncident) {
        throw createError(401, "No se pudo eliminar la incidencia");
      }

      res.status(200).json({
        message: "Incidencia eliminada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Eliminar incidencia como Admin
categoryIncidentsRouter.delete(
  "/incidents/:incidentId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    const incidentId = req.params.incidentId;

    try {
      const [incident] = await dbPool.execute(
        `SELECT *
      FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }

      const deleteIncident = await dbPool.execute(
        `DELETE FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (!deleteIncident) {
        throw createError(401, "No se pudo eliminar la incidencia");
      }

      res.status(200).json({
        message: "Incidencia eliminada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);