import { Router, json } from "express";
import { getPool } from "../../../database/getPool.js";
import { validateRoomId } from "../../../validations/validateRoomId.js";

const pool = getPool();

export const roomsController = Router();

roomsController.get("/rooms", async (req, res, next) => {
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

roomsController.get("/room/:roomId", async (req, res, next) => {
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

roomsController.get("/rooms/searchReservations", async (req, res, next) => {
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
