import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import { validateLoginRequest } from "../../../validations/validateLoginRequest.js";

const dbPool = getPool();

export const roomRouter = Router();

// Endpoint creación de un espacio con nombre, desc, etc (admin)
roomRouter.post("/create-rooms", async (req, res, next) => {
  try {
    const { name, description, capacity, typeOf } = req.body;

    const roomsId = crypto.randomUUID();

    await dbPool.execute(
      `INSERT INTO rooms(id, name, description, capacity, typeOf) VALUES (?, ?, ?, ?, ?)`,
      [roomsId, name, description, capacity, typeOf]
    );

    res.json({
      success: true,
      message: "Rooms agregado exitosamente",
    });
  } catch (err) {
    next(err);
  }
});

roomRouter.get("/rooms", async (req, res, next) => {
  try {
    // Consultamos los espacios almacenados en la DB
    const [rooms] = await pool.execute(
      "SELECT rooms.name, rooms.description, rooms.capacity, rooms.typeOf FROM rooms"
    );
    if (!rooms) {
      throw new Error("Rooms not found");
    }
    res.json({
      success: true,
      message: rooms,
    });
  } catch (err) {
    next(err);
  }
});

roomRouter.get("/room/:roomId", async (req, res, next) => {
  try {
    // Extraemos la id de la room de los parámetros de la petición
    const roomId = req.params.roomId;
    // Consultamos el espacio en la BD
    const room = await validateRoomId(roomId);
    res.json({
      success: true,
      message: room,
    });
  } catch (error) {
    next(error);
  }
});
