// routes/mpRoutes.ts
import express from "express";
import { createPaymentPreference } from "../controllers/mercadoPagoController";
import { mercadoPagoWebhook } from "../controllers/mercadoPagoWebhookController";


const router = express.Router();

router.post("/mercadopago/create-preference/:orderId", createPaymentPreference);
router.post("/webhooks/mercadopago", mercadoPagoWebhook);
export default router;
