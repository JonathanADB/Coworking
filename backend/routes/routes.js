import express from "express";
import { userRouter } from "./api/user/user.js";
import { equipmentAdminRouter } from "./api/admin/equipmentAdmin.js";
import { roomRouter } from "./api/room/room.js";
import {
  categoryIncidentsRouter,
  listIncidentsRouter,
} from "./api/incident/incident.js";
import { reservationRouter } from "./api/reservation/reservation.js";
import { reviewRouter } from "./api/review/review.js";
import { searchsRouter } from "./api/searchs/searchs.js";
import { mediaRouter } from "./api/media/media.js";
// import { equipmentRouter } from "./api/admin/equipment.js";

const router = express.Router();

router.use(userRouter);
router.use(mediaRouter);
router.use(equipmentAdminRouter);
// router.use(equipmentRouter);
router.use(roomRouter);
router.use(categoryIncidentsRouter);
router.use(listIncidentsRouter);
router.use(reservationRouter);
router.use(reviewRouter);
router.use(searchsRouter);

export default router;