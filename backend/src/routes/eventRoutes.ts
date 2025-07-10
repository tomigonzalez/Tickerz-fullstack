import express from "express";

import { verifyToken } from "../middleware/verifyToken";
import { createEvent, getMyEvents } from "../controllers/eventController";


const router = express.Router();

router.post("/events", verifyToken, createEvent);
router.get("/events/my", verifyToken, getMyEvents);

export default router;
