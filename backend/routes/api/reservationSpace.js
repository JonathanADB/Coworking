 // Endpoint para reservar y cancelar un espacio

import { Router } from 'express';
import joi from 'joi';
import Reservation from '../../models/Reservation.js';

const reservationRouter = Router();

reservationRouter.post('/reserve', async (req, res) => {
    const schema = joi.object({
        spaceId: joi.string().required(),
        userId: joi.string().required(),
        date: joi.date().required(),
        startTime: joi.string().required(),
        endTime: joi.string().required(),
        confirmed: joi.boolean().required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(error);
    }

    const reservation = new Reservation(value);
    await reservation.save();

    return res.status(200).json(reservation);
});

reservationRouter.post('/cancel', async (req, res) => {
    const schema = joi.object({
        reservationId: joi.string().required()
    });
    
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(error);
    }

    await Reservation.findByIdAndRemove(value.reservationId);

    return res.status(200).json({ message: 'Reservation canceled' });
});


export default reservationRouter;