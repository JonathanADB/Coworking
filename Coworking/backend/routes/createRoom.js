import { Router } from 'express';
const router = Router();
import { Room } from '../models/Room';

// Endpoint creación de un espacio con nombre, desc, etc (admin)

router.post('/create', async (req, res) => {
    const { name, description, capacity, location, type, admin } = req.body;
    const newRoom = new Room({ name, description, capacity, location, type, admin });
    await newRoom.save();
    res.json({ message: 'Room created' });
});
 




