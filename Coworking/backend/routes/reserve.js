 // Endpoints para reservar y cancelar la reserva de un espacio.

import { Router } from 'express';
const router = Router();
import { Room } from '../database/dbSchema';
import { Reservation } from '../database/dbSchema';
import { User } from '../database/dbSchema';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
router.post('/reserve', [checkJwt, checkRole(['user'])], async (req, res) => {
    const { roomId, userId, date, time } = req.body;
    const   room = await    Room.findById(roomId);
    const   user = await    User.findById   (userId);   
    const reservation = new Reservation({ room, user, date, time });    
    await reservation.save();
    res.json({ message: 'Reservación creada' });
});
router.delete('/cancel', [checkJwt, checkRole(['user'])], async (req, res) => {
    const { reservationId } = req.body;
    await Reservation.findByIdAndDelete(reservationId);
    res.json({ message: 'Reservación cancelada' });
});

// no estoy seguro de las rutas a la base de datos sea correcta.
// los import me los autocompleta el visual por eso no estoy seguro de la ruta este correcta.git