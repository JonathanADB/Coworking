import { Router } from "express";
import { getPool } from "../../database/getPool.js";

const dbPool = getPool();

export const roomsTypesRouter = Router();

roomsTypesRouter.get("/rooms/types", async (req, res, next) => {
  try {
    const typeOf = req.body;

    const [roomsListByType] = await dbPool.execute(
      `SELECT rooms.name, rooms.description, rooms.capacity, rooms.typeOf, reviews.rate 
        FROM rooms 
        JOIN reviews
            ON rooms.id = reviews.roomId
        WHERE rooms.typeOf=?`,
      [typeOf]
    );

    res.json(success(roomsListByType));
  } catch (err) {
    next(err);
  }
});
