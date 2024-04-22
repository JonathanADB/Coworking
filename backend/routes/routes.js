import express from 'express';
import confirmationRejection from './api/confirmationRejection';
import createRoom from './api/createRoom';
import reserve from './api/reserve';
import registerNewUser from './api/user/registerNewUser';
import loginUser from './api/user/loginUser';
import validateUser from './api/user/validateUser';
import forgotPassword from './api/user/forgotPassword'; //jhonny
import changePassword from './api/user/changePassword'; //jhonny
import transporter from '../utils/emailConfig';         //jhonny

const router = express.Router();

router.use('/register', registerNewUser);
router.use('/login', loginUser);
router.use('/validate', validateUser);
router.use('/forgot-password', forgotPassword); //jhony
router.use('/change-password', changePassword); //jhonny
router.use('/confirmationRejection', confirmationRejection);
router.use('/createRoom', createRoom);
router.use('/reserve', reserve);  //*jhonny

export { router, transporter }; // Exporta el router y el objeto de transporte de nodemailer jhonny