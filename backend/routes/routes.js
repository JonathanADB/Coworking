import express from "express";
import { userRouter } from "./api/user/user.js";
import { equipmentAdminRouter } from "./api/admin/equipmentAdmin.js";
import { roomRouter } from "./api/room/room.js";
import {
  categoryIncidentsRouter,
  listIncidentsRouter,
} from "./api/incident/incident.js";
import { reviewRouter } from "./api/review/review.js";
import { searchsRouter } from "./api/searchs/searchs.js";
import { reservationRouter } from "./api/reservation/reservation.js";
import { mediaRouter } from "./api/media/media.js";
import { adminUsers } from "./api/user/userAdmin.js";
// import { equipmentRouter } from "./api/admin/equipment.js";

const router = express.Router();

router.use(userRouter);
router.use(mediaRouter);
router.use(roomRouter);
router.use(categoryIncidentsRouter);
router.use(listIncidentsRouter);
router.use(reservationRouter);
router.use(reviewRouter);
router.use(searchsRouter);
router.use(adminUsers);
router.use(equipmentAdminRouter);

export default router;
