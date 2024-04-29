import { Router } from "express";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { getPool } from "../../../database/getPool.js";
import Joi from "joi";
const dbPool = getPool();

export const categoryIncidentsRouter = Router();

const querySchema = Joi.object({
  offset: Joi.number().integer().min(0)
});

const incidentSchema = Joi.object({
  description: Joi.string().required(),
  userId: Joi.string().required(),
  roomId: Joi.string().required(),
  equipmentId: Joi.string().required()
});

const paramsSchema = Joi.object({
  incidentId: Joi.string().required()
});

//Agregar una incidencia
categoryIncidentsRouter.post("/incidents/add", authenticate, async (req, res, next) => {
  const { error } = incidentSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

export const listIncidentsRouter = Router();

//Lista de incidencias (Admin)
listIncidentsRouter.get("/incidents", async (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message);

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

// PArecido a de lista de incidencias  ( MIRAR )
categoryIncidentsRouter.get("/incidents/:incidentId", async (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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
      return res.status(404).send('Incidencia no encontrada');
    }

    res.json(incident[0]);
  } catch (err) {
    next(err);
  }
});