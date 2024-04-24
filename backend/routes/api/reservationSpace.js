 // Endpoint para reservar y cancelar un espacio

import express from 'express';
import router from 'express-promise-router';
import joi from 'joi';
import Reservation from '../../models/Reservation.js';


const app = express();

app.use('/api', router);

router.post('/reserve', async (req, res) => {
    const schema = joi.object().keys({
        spaceId: joi.string().required(),
        userId: joi.string().required(),
        date: joi.date().required()
    });

    const { error, value } = joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json(error);
    }

    const reservation = new Reservation(value);
    await reservation.save();

    return res.status(200).json(reservation);
});

router.post('/cancel', async (req, res) => {
    const schema = joi.object().keys({
        reservationId: joi.string().required()
    });

    const { error, value } = joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json(error);
    }

    await Reservation.findByIdAndRemove(value.reservationId);

    return res.status(200).json({ message: 'Reservation canceled' });
});


export default router;