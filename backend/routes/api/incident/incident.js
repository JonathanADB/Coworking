import { Router } from "express";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { getPool } from "../../../database/getPool.js";

const dbPool = getPool();

export const incidentRouter = Router();

// Agregar una incidencia
incidentRouter.post("/incidents/add", authenticate, async (req, res, next) => {
  try {
    const { description, userId, roomId, equipmentId } = req.body;

    await dbPool.execute(
      `INSERT INTO incidents (id, description, userId, roomId, equipmentId) VALUE (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), description, userId, roomId, equipmentId]
    );

    res.json({
      success: true,
      message: "Incidencia transmitida con éxito",
    });
  } catch (err) {
    next(err);
  }
});

// Lista de incidencias (Admin)
incidentRouter.get("/incidents", async (req, res, next) => {
  try {
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
});

// Parecido a de lista de incidencias  ( MIRAR )
incidentRouter.get("/incidents/:incidentId", async (req, res, next) => {
  try {
    const incidentId = req.params.incidentId;

    await dbPool.execute(
      `SELECT incidents.id, incidents.description, users.userName, rooms.name, equipment.name
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      WHERE incidents.id=?`,
      [incidentId]
    );
  } catch (err) {
    next(err);
  }
});
