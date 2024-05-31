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


// Añadir incidencia
categoryIncidentsRouter.post(
  "/incidents/:reservationId",
  authenticate,
  async (req, res, next) => {
    const userId = req.user.id;
    const reservationId = req.params.reservationId;

    // Log para depuración
    console.log("User ID:", userId);
    console.log("Reservation ID:", reservationId);

    const { description, equipmentId, roomId } = req.body;

    // Validar el cuerpo de la solicitud
    const { error } = incidentSchema.validate(req.body);
    if (error) {
      console.log("Validation Error:", error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }

    try {
      if (reservationId !== "0") {
        // Verificar si la reserva existe y pertenece al usuario
        const [reservation] = await dbPool.execute(
          `SELECT * FROM reservations WHERE id = ? AND userId = ?`,
          [reservationId, userId]
        );

        if (!reservation.length) {
          console.log("Reservation not found or does not belong to the user");
          return res.status(404).json({
            message: "Reserva no encontrada o no pertenece al usuario",
          });
        }

        if (reservation[0].reservationCheckin === 0) {
          console.log("Reservation not confirmed");
          return res.status(400).json({
            message: "No puedes añadir una incidencia a una reserva no confirmada",
          });
        }

        if (reservation[0].roomId !== roomId) {
          console.log("Room ID mismatch");
          return res.status(400).json({
            message: "El roomId proporcionado no coincide con el roomId de la reserva",
          });
        }
      }

      // Insertar la incidencia en la base de datos
      const [addIncident] = await dbPool.execute(
        `INSERT INTO incidents (id, description, userId, roomId, equipmentId) VALUES (?, ?, ?, ?, ?)`,
        [crypto.randomUUID(), description, userId, roomId, equipmentId]
      );

      if (!addIncident.affectedRows) {
        console.log("Incident insertion failed");
        throw createError(401, "No se pudo añadir la incidencia");
      }

      res.status(201).json({
        message: "Incidencia transmitida con éxito",
      });
      
    } catch (err) {
      console.error("Error caught:", err);
      next(err);
    }
  }
);


export const listIncidentsRouter = Router();

//Lista de incidencias (Admin)
listIncidentsRouter.get("/incidents",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { error } = querySchema.validate(req.query);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const offset = req.query.offset || 0;
      const [incidents] = await dbPool.execute(
        `SELECT
          incidents.id AS incidentId, 
          incidents.description, 
          incidents.status, 
          users.id AS userId, 
          rooms.id AS roomId, 
          rooms.name AS roomName, 
          equipment.id AS equipmentId,
          equipment.name AS equipmentName,
          incidents.createdAt, incidents.updatedAt
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
    
      res.status(200).json({
      message: incidents,
    });
  } catch (err) {
    next(err);
  }
});

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
      `SELECT 
      incidents.id AS incidentId, 
      incidents.description,
      incidents.status,
      users.userName,
      rooms.id AS roomId,
      rooms.name AS roomName,
      equipment.id AS equipmentId,  
      equipment.name AS equipmentName,
      incidents.createdAt,
      incidents.updatedAt
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

// Modificar incidencia como Admin
categoryIncidentsRouter.patch(
  "/incidents/:incidentId",
  authenticate,
  async (req, res, next) => {
    const incidentId = req.params.incidentId;
    const { status } = req.body;

    try {
      const [incident] = await dbPool.execute(
        `SELECT *
      FROM incidents
      WHERE id=?`,
        [incidentId]
      );

      if (!incident || incident.length === 0) {
        throw createError(404, "Incidencia no encontrada");
      }

      const currentDate = new Date();

      const updateIncident = await dbPool.execute(
        `UPDATE incidents
        SET status=?, updatedAt=?
        WHERE id=?`,
        [status, currentDate, incidentId]
      );

      if (!updateIncident) {
        throw createError(401, "No se pudo modificar la incidencia");
      }

      res.status(200).json({
        message: "Incidencia modificada con éxito",
        updatedAt: currentDate,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Eliminar incidencia creada por un usuario
categoryIncidentsRouter.delete(
  "/incident/:incidentId",
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
  "/incident/:incidentId",
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