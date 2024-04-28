import express from "express";

import { userRouter } from "./api/user/user.js";
import { equipmentAdminRouter } from "./api/admin/equipmentAdmin.js";
import { roomsRouter, roomsTypesRouter, reservationRouter } from "./api/rooms/rooms.js";
import { categoryIncidentsRouter,listIncidentsRouter } from "./api/incidents/incidents.js";
import { reviewController } from "./api/review/review.js";
import { roomsController } from "./api/rooms/roomsController.js";

const router = express.Router();

router.use(userRouter);
router.use(equipmentAdminRouter);
router.use(roomsRouter);
router.use(roomsTypesRouter);
router.use(reservationRouter);
router.use(categoryIncidentsRouter);
router.use(listIncidentsRouter);
router.use(reviewController);
router.use(roomsController);

export default router;