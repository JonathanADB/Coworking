import express from "express";
// import confirmationRejection from "./api/confirmationRejection.js";
// import createRoom from "./api/createRoom.js";
// import reserve from "./api/reserve.js";
import registerNewUser from "./api/user/registerNewUser.js";
import loginUser from "./api/user/loginUser.js";
import validateUser from "./api/user/validateUser.js";
import { equipmentRouter } from "./api/equipmentList.js";
import { roomsTypesRouter } from "./api/roomsTypes.js";
import { categoryIncidentsRouter } from "./api/categoryIncidents.js";
import { reservationReview } from "./api/reservationReview.js";
import { roomsList } from "./api/roomsList.js";

const router = express.Router();

router.use(registerNewUser);
router.use(loginUser);
router.use(validateUser);
// router.use("/confirmationRejection", confirmationRejection);
// router.use("/createRoom", createRoom);
// router.use("/reserve", reserve);
router.use(equipmentRouter);
router.use(roomsTypesRouter);
router.use(categoryIncidentsRouter);
router.use(reservationReview);
router.use(roomsList);

export default router;
