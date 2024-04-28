import { Router, json } from "express";
import { getPool } from "../../../database/getPool.js";

const pool = getPool();

export const searchsRouter = Router();

// Búsqueda de rooms por tipo
searchsRouter.post("/rooms/types", async (req, res, next) => {
  try {
    const { typeOf } = req.body;

    const [roomsListByType] = await pool.execute(
      `SELECT rooms.name, rooms.description, rooms.capacity, rooms.typeOf
        FROM rooms 
        WHERE rooms.typeOf=?`,
      [typeOf]
    );

    res.json({
      roomsListByType,
    });
  } catch (err) {
    next(err);
  }
});

// Búsqueda para listar equipos
searchsRouter.get("/equipment/searchlist", async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const offset = req.query.offset || 0;

    const [equipment] = await pool.execute(
      `SELECT name FROM equipment
        WHERE name LIKE ? OR description LIKE ?
        ORDER BY name DESC
        LIMIT 10 OFFSET ${offset}`,
      [`%${search}%`, `%${search}%`]
    );

    const equipmentNames = equipment.map((item) => item.name);

    res.json({
      success: true,
      message: equipmentNames,
    });
  } catch (err) {
    next(err);
  }
});

searchsRouter.get("/rooms/searchReservations", async (req, res, next) => {
  try {
    // Recuperamos las querys
    let roomId = req.query.roomId;
    let dateBeg = req.query.dateBeg;
    let dateEnd = req.query.dateEnd;
    let rooms = "";
    // Comprobamos si se ha introducido la fecha de comienzo de la reserva
    if (!dateBeg) {
      throw new Error("dateBeg is not define");
    }
    // Comprobamos si se ha introducido la fecha de final de la reserva
    if (!dateEnd) {
      throw new Error("dateEnd is not define");
    }
    // Verificamos si la fecha de final de la reserva es posterior a la de comienzo
    if (dateEnd <= dateBeg) {
      throw new Error("dateEnd is not correct");
    }
    // Convertimos los datos de entrada en Strings
    const dateBegString = dateBeg.toString();
    const dateEndString = dateEnd.toString();
    // Si no se ha definido un espacio, se buscarán reservas en todos
    if (!roomId) {
      [rooms] = await pool.execute(
        "SELECT rooms.name, COUNT(reservations.id) AS reservationsNumber FROM rooms INNER JOIN reservations ON rooms.id=reservations.roomId WHERE reservations.reservationDateBeg >= ? AND reservations.reservationDateEnd <= ? GROUP BY rooms.name",
        [dateBegString, dateEndString]
      );
      // Si se ha definido una sala, se buscarán reservas en ésta
    } else {
      const room = await validateRoomId(roomId);
      const roomIdString = roomId.toString();
      [rooms] = await pool.execute(
        "SELECT rooms.name, COUNT(reservations.id) AS reservationsNumber FROM rooms INNER JOIN reservations ON rooms.id=reservations.roomId WHERE reservations.reservationDateBeg >= ? AND reservations.reservationDateEnd <= ? AND rooms.id = ? GROUP BY rooms.name",
        [dateBegString, dateEndString, roomIdString]
      );
    }
    res.json({
      success: true,
      message: rooms,
    });
  } catch (err) {
    next(err);
  }
});
