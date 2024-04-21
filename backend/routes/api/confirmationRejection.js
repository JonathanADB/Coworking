// Endpoint para confirmar o rechazar la reserva con envío la reserva con envio de email al cliente (admin)
import { Router } from 'express';
const router = Router();
import { Reservation } from '../database/dbSchema';
import { User } from '../database/dbSchema';
import { Room } from '../database/dbSchema';    
import { sendEmail } from '../utils/sendEmail';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
router.put('/confirm', [checkJwt, checkRole(['admin'])], async (req, res) => {
    const { reservationId } = req.body;
    const reservation = await Reservation.findById(reservationId);
    reservation.status = 'confirmada';
    await reservation.save();
    const user = await User.findById(reservation .user);
    const room = await Room.findById(reservation.room);
    await sendEmail(user.email, 'Reservación confirmada', `Su reservación en ${room.name} ha sido confirmada.`);
    res.json({ message: 'Reservación confirmada' });
});
// En la documentación que he estado mirando, para poder enviar un email de confirmación
// solo hace falta instalar npm install nodemailer y luego importar el módulo en el archivo
// la cosa es que tambien dice que hay que configurar con el servidor de email que tengamosy allí ya me pierdo.