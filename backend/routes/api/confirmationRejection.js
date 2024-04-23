// Edpoint para confirmar o rechazar la reserva con envío de email

import express from 'express';
import router from 'express-promise-router';
import joi from 'joi';

import nodemailer from 'nodemailer';
import Reservation from '../../models/Reservation.js';
const app = express();

app.use('/api', router);


router.post('/confirm', async (req, res) => {
    const schema = joi.object().keys({
        reservationId: joi.string().required()
    });

    const { error, value } = joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json(error);
    }

    const reservation = await Reservation.findById(value.reservationId);

    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = 'confirmed';
    await reservation.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@coworking.com', // Aqui se pone el email real
            pass: 'user1234', // y aqui la contraseña real
        }});

    const mailOptions = {
        from: ' info@coworking.com',
        to: reservation.email,
        subject: 'Reservation confirmed',
        text: 'Your reservation has been confirmed'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json(error);
        }
    });

    return res.status(200).json({ message: 'Reservation confirmed' });
});

router.post('/reject', async (req, res) => {
    const schema = joi.object().keys({
        reservationId: joi.string().required()
    });

    const { error, value } = joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json(error);
    }

    const reservation = await Reservation.findById(value.reservationId);

    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = 'rejected';
    await reservation.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@coworking.com',
            pass: 'user1234',
        }});
    const mailOptions = {
        from: 'info@coworking.com',
        to: reservation.email,
        subject: 'Reservation rejected',
        text: 'Your reservation has been rejected'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json(error);
        }
    });

    return res.status(200).json({ message: 'Reservation rejected' });
});

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default router;


