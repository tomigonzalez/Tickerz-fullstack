import express from "express";

import { verifyToken } from "../middleware/verifyToken";
import { createEvent, deleteEvent, getEventBySlug, getMyEvents, updateEvent } from "../controllers/eventController";


const router = express.Router();

router.post("/events", verifyToken, createEvent);
router.get("/events/my", verifyToken, getMyEvents);
router.put("/events/:id", verifyToken, updateEvent);
router.delete("/events/:id", verifyToken, deleteEvent);

router.get("/events/:slug", getEventBySlug); 

export default router;
