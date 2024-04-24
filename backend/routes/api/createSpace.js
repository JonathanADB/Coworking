import express from 'express';
import router from 'express-promise-router';
import joi from 'joi';
import Space from '../../models/Space.js';

const app = express();

app.use('/api', router);

router.post('/create', async (req, res) => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        address: joi.string().required(),
        capacity: joi.number().required(),
        price: joi.number().required()
    });

    const { error, value } = joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json(error);
    }

    const space = new Space(value);
    await space.save();

    return res.status(200).json(space);
});
 const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
export default router;



