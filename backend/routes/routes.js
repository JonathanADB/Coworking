import express from "express";
import registerNewUser from "./api/user/registerNewUser.js";
import loginUser from "./api/user/loginUser.js";
import validateUser from "./api/user/validateUser.js";
//import confirmationRejection from "./api/confirmationRejection.js";
//import createSpace from "./api/createSpace.js";
import {forgotPassword} from "./api/user/forgotPassword.js";
import {changePassword} from "./api/user/changePassword.js";
//import transporter from "../utils/emailConfig.js";
import { equipmentRouter } from "./api/equipmentList.js";
import { roomsTypesRouter } from "./api/roomsTypes.js";
import { categoryIncidentsRouter } from "./api/categoryIncidents.js";
import { reviewController } from "./api/reviewController.js";
import { roomsController } from "./api/roomsController.js";
//import reservationRouter from "./api/reservationSpace.js";

const router = express.Router();

router.use(registerNewUser);
router.use(loginUser);
router.use(validateUser);
router.use(forgotPassword);
router.use(changePassword);
//router.use(confirmationRejection);
//router.use(createSpace);
//router.use(reservationRouter);
router.use(equipmentRouter);
router.use(roomsTypesRouter);
router.use(categoryIncidentsRouter);
router.use(reviewController);
router.use(roomsController);

export default router;

//export { router, transporter };