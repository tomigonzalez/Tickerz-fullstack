// routes/orderRoutes.ts (o donde estés manejando tus rutas)
import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import { getOrderByCode, getOrderById, getOrdersByEvent, purchaseTicket } from "../controllers/orderController";


const router = Router();

router.get("/events/:id/orders", verifyToken, getOrdersByEvent);
router.post("/events/:slug/purchase", purchaseTicket); // pública

router.get("/:id", getOrderById); // público
router.get("/code/:code", getOrderByCode); // público
export default router;