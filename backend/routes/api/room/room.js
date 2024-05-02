import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import { validateLoginRequest } from "../../../validations/validateLoginRequest.js";
import isAdmin from "../../middleware/isAdmin.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateRoomId } from "../../../validations/validateRoomId.js";
import { validateRoomRequest } from "../../../validations/validateRoomRequest.js";

const dbPool = getPool();

export const roomRouter = Router();

// Endpoint creación de un espacio con nombre, desc, etc (admin)
roomRouter.post("/create-rooms", authenticate, isAdmin, async (req, res, next) => {
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

//Actualizacion de datos de un espacio (Update Admin)
roomRouter.put('/room/:id', authenticate, isAdmin, async (req, res, next)=>{
  try {
    const roomId = req.params.id;
    const room = await validateRoomId(roomId)
    const { name, description, capacity, typeOf } = validateRoomRequest (req.body);

    await dbPool.execute(
      `UPDATE rooms SET name=?, description=?, capacity=?, typeOf=?, updatedAt=CURRENT_TIME()
      WHERE id=?`,
      [
        name ? name : room.name,
        description ? description : room.description,
        capacity ? capacity : room.capacity,
        typeOf ? typeOf : room.typeOf,
        roomId,
      ])

    res.json({
      success: true,
      message: "Room actualizada correctamente",
    });

    
  } catch (err) {
    next(err)
  }

});

// Endpoint para obtener todos los espacios (admin)
roomRouter.get("/rooms", authenticate, isAdmin, async (req, res, next) => {
  try {
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
