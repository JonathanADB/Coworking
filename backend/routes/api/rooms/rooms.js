import { Router } from 'express';
import { getPool } from '../../../database/getPool.js';
import { validateLoginRequest } from '../../../validations/validateLoginRequest.js';

const dbPool = getPool();

export const roomsRouter = Router();
export const roomsTypesRouter = Router();

// Endpoint creación de un espacio con nombre, desc, etc (admin)
roomsRouter.post('/create-rooms', async (req, res, next) => {
    try {
        const { name, description, capacity, typeOf} = req.body;

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

//Busqueda de rooms por tipo
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

//reserva de rooms
export const reservationRouter = Router();

reservationRouter.post("/rooms/:roomId", async (req, res, next) => {
    try {
        
        const roomId  = req.params.roomId;
        const { userId, reservationDateBeg, reservationDateEnd } = req.body;
        if (!userId || !reservationDateBeg || !reservationDateEnd || !roomId) {
            return res.status(400).json({
                error: 'Falta información'
            });
        }
        const [existingReservation] = await dbPool.execute(
            `SELECT * FROM reservations
            WHERE roomId = ? AND
            (reservationDateBeg <= ? AND reservationDateEnd >= ?) OR
            (reservationDateBeg <= ? AND reservationDateEnd >= ?)`,
            [roomId, reservationDateBeg, reservationDateBeg, reservationDateEnd, reservationDateEnd]
        );
        
        if (existingReservation.length > 0){
            return res.status(408).json({
                success: false,
                message: 'La sala ya esta servada este periodo'
            });
        }
        const reservationsId = crypto.randomUUID();

        await dbPool.execute(
            `INSERT INTO reservations (id, roomId, userId, reservationDateBeg, reservationDateEnd) VALUES (?,?,?,?,?)`,
            [reservationsId, roomId, userId, reservationDateBeg, reservationDateEnd]
        );
        res.json({
            success: true,
            message: "Reserva realizada con exito",
          });
        } catch (err) {
          next(err);
        }
      });

//cancelar reserva hecha 
reservationRouter.delete("/rooms/:roomId/reservations/:reservationId", async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const reservationId = req.params.reservationId;
        
        if (!roomId || !reservationId) {
            return res.status(400).json({
                error: 'Falta información'
            });
        }

        const [reservation] = await dbPool.execute(
            `SELECT * FROM reservations WHERE id = ? AND roomId = ?`,
            [reservationId, roomId]
        );
        
        if (reservation.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Reserva no encontrada'
            });
        }
        await dbPool.execute(
            `DELETE FROM reservations WHERE id = ? AND roomId = ?`,
            [reservationId, roomId]
        );

        res.json({
            success: true,
            message: 'Reserva cancelada con éxito',
        });
    } catch (err) {
        next(err);
    }
});