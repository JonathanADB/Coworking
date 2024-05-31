import { Router, json } from "express";
import { getPool } from "../../../database/getPool.js";
import {
  searchRoomTypeOfSchema,
  searchFiltersSchema,
} from "../../schemas/searchSchemas.js";
import { createError } from "../../../utils/error.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import isAdmin from "../../middleware/isAdmin.js";


const pool = getPool();

export const searchsRouter = Router();

// get  - /rooms?search=Palabra&type=private&orderType=DESC&order=capacity (req.query)
// Búsqueda de rooms por tipo
searchsRouter.get("/rooms/types", async (req, res, next) => {
  try {
    const { typeOf } = req.body;
    const { error } = searchRoomTypeOfSchema.validate({
      typeOf,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [roomsListByType] = await pool.execute(
      `SELECT rooms.name, rooms.description, rooms.capacity, rooms.typeOf
        FROM rooms 
        WHERE rooms.typeOf=?`,
      [typeOf]
    );
    res.status(200).json({
      roomsListByType,
    });

    if (!roomsListByType) throw new Error("No se ha podido encontrar la sala");
  } catch (err) {
    err.status = 401;
    next(err);
  }
});

// Búsqueda para listar equipos
searchsRouter.get("/equipment/searchlist", async (req, res, next) => {
  try {
    const { search, offset, limit, direction } = req.query;

    const { error } = searchFiltersSchema.validate({
      search,
      offset,
      limit,
      direction,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }

    const validateDirection = ["ASC", "DESC"];
    const orderDirection = validateDirection.includes(direction)
      ? direction
      : "ASC";

    const validateLimit = [10, 25, 50, 100];
    const limitSet = validateLimit.includes(+limit) ? limit : 10;

    const [equipment] = await pool.execute(
      `SELECT id, name, description, inventory FROM equipment
        WHERE name LIKE ? OR description OR inventory LIKE ?
        ORDER BY name ${orderDirection}
        LIMIT ${limitSet} OFFSET ${offset}`,
      [`%${search}%`, `%${search}%`]
    );

    const [[{ equipmentTotal }]] = await pool.execute(
      `SELECT COUNT(*) equipmentTotal FROM equipment
        WHERE name LIKE ? OR description OR inventory LIKE ?`,
      [`%${search}%`, `%${search}%`]
    );
    res.status(200).json({
      data: equipment,
      totalResults: equipmentTotal,
    });

    if (!equipment)
      throw new Error("No se puede encontrar ningún equipamiento");
  } catch (err) {
    err.status = 401;
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
    const { error } = viewRoomSchema.validate({
      roomId,
      dateBeg,
      dateEnd,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    // Verificamos si la fecha de final de la reserva es posterior a la de comienzo
    if (dateEnd <= dateBeg) {
      throw createError(400, "dateEnd es una fecha igual o previa a dateBeg");
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
      const rooms = await validateRoomId(roomId);
      const roomIdString = roomId.toString();
      [rooms] = await pool.execute(
        "SELECT rooms.name, COUNT(reservations.id) AS reservationsNumber FROM rooms INNER JOIN reservations ON rooms.id=reservations.roomId WHERE reservations.reservationDateBeg >= ? AND reservations.reservationDateEnd <= ? AND rooms.id = ? GROUP BY rooms.name",
        [dateBegString, dateEndString, roomIdString]
      );
    }
    res.status(200).json({
      message: rooms,
    });
  } catch (err) {
    next(err);
  }
});

//Busqueda de Espacios 
searchsRouter.get(
  "/rooms/searchlist",
  async (req, res, next) => {
    try {
      const { search, offset, limit, direction } = req.query;

      const { error } = searchFiltersSchema.validate({
        search,
        offset,
        limit,
        direction,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const validateDirection = ["ASC", "DESC"];
      const orderDirection = validateDirection.includes(direction)
        ? direction
        : "ASC";

      const validateLimit = [10, 25, 50, 100];
      const limitSet = validateLimit.includes(+limit) ? limit : 10;

      const [rooms] = await pool.execute(
        `SELECT id, name, description, capacity, typeOf FROM rooms
            WHERE name LIKE ? OR description OR capacity LIKE ?
            ORDER BY name ${orderDirection}
            LIMIT ${limitSet} OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`]
      );

      const [[{ roomsTotal }]] = await pool.execute(
        `SELECT COUNT(*) roomsTotal FROM rooms
            WHERE name LIKE ? OR description OR capacity LIKE ?`,
        [`%${search}%`, `%${search}%`]
      );

      res.status(200).json({
        data: rooms,
        totalResulsts: roomsTotal,
      });

    if (!rooms)
      throw new Error("No se puede encontrar ningún equipamiento");
  } catch (err) {
    err.status = 401;
    next(err);
  }
});

//Busqueda de Incidencias 
searchsRouter.get(
  "/incidents/searchlist",
authenticate,
isAdmin,
  async (req, res, next)  => {
    try {
      const { search, offset, limit, direction } = req.query;

      const { error } = searchFiltersSchema.validate({
        search,
        offset,
        limit,
        direction,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const validateDirection = ["ASC", "DESC"];
      const orderDirection = validateDirection.includes(direction)
        ? direction
        : "ASC";

      const validateLimit = [10, 25, 50, 100];
      const limitSet = validateLimit.includes(+limit) ? limit : 10;

      const [incidents] = await pool.execute(
        `SELECT id, description, userId, roomId, equipmentId FROM incidents
            WHERE userId LIKE ? OR description OR roomId LIKE ?
            ORDER BY userId ${orderDirection}
            LIMIT ${limitSet} OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`]
      );

      const [[{ incidentsTotal }]] = await pool.execute(
        `SELECT COUNT(*) incidentsTotal FROM incidents
            WHERE userId LIKE ? OR description OR roomId LIKE ?`,
        [`%${search}%`, `%${search}%`]
      );

      res.status(200).json({
        data: incidents,
        totalResulsts: incidentsTotal,
      });

    if (!incidents)
      throw new Error("No se puede encontrar ningún incidencia");
  } catch (err) {
    err.status = 401;
    next(err);
  }
});
