import express from 'express';
import confirmationRejection from './api/confirmationRejection';
import createRoom from './api/createRoom';
import reserve from './api/reserve';
import registerNewUser from './api/user/registerNewUser';
import loginUser from './api/user/loginUser';
import validateUser from './api/user/validateUser';

const router = express.Router();

router.use('/register', registerNewUser);
router.use('/login', loginUser);
router.use('/validate', validateUser)
router.use('/confirmationRejection', confirmationRejection);
router.use('/createRoom', createRoom);
router.use('/reserve', reserve);

export default router;