import { Router } from "express";
import { getPool } from "../../database/getPool.js";

const dbPool = getPool();

export const roomsTypesRouter = Router();

roomsTypesRouter.post("/rooms/types", async (req, res, next) => {
  try {
    const {typeOf} = req.body;

    const [roomsListByType] = await dbPool.execute(
      `SELECT rooms.name, rooms.description, rooms.capacity, rooms.typeOf
        FROM rooms 
        WHERE rooms.typeOf=?`,
      [typeOf]
    );

    res.json({
      roomsListByType
    });
  } catch (err) {
    next(err);
  }
});
