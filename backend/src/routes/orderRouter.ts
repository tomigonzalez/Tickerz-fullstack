// routes/orderRoutes.ts (o donde estés manejando tus rutas)
import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import { getOrdersByEvent } from "../controllers/orderController";


const router = Router();

router.get("/events/:id/orders", verifyToken, getOrdersByEvent);

export default router;