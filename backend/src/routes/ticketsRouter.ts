// routes/tickets.ts
import express from "express";

import { verifyToken } from "../middleware/verifyToken";
import { validateTicket } from "../controllers/ticketController";


const router = express.Router();

router.get("/validate/:code", verifyToken, validateTicket);

export default router;