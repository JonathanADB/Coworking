import { Router } from "express";
import { getPool } from "../../database/getPool.js";

const dbPool = getPool();

export const categoryIncidentsRouter = Router();

categoryIncidentsRouter.get("/incidents", async (req, res, next) => {
  try {
    const offset = req.query.offset || 0;

    const [totalIncidents] = await dbPool.execute(
      `SELECT * FROM incidents
      JOIN users
        ON users.id = incidents.userId
      JOIN rooms
        ON rooms.id = incidents.roomId
      JOIN equipment
        ON equipment.id = incidents.equipmentId
      ORDER BY createdAt DESC, updatedAt DESC 
      LIMIT 10 OFFSET ${offset}`
    );

    res.json(success(totalIncidents));
  } catch (err) {
    next(err);
  }
});

categoryIncidentsRouter.get(
  "/incidents/:incidentId",
  async (req, res, next) => {
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
  }
);
