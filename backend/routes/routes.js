import express from 'express';
import confirmationRejection from './api/confirmationRejection';
import createRoom from './api/createRoom';
import reserve from './api/reserve';

const router = express.Router();

router.use('/confirmationRejection', confirmationRejection);
router.use('/createRoom', createRoom);
router.use('/reserve', reserve);

export default router;