import { Request, Response } from "express";
import Orders from "../models/Orders";

import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import mpClient from "../config/mercadoPago";
import { Payment } from "mercadopago/dist/clients/payment";
import { sendTicketEmail } from "../services/sendTicketEmail";



export const mercadoPagoWebhook = async (req: Request, res: Response) => {
//    const secret = req.query.secret || req.headers['x-webhook-secret'];

// if (secret !== process.env.MP_WEBHOOK_SECRET) {
//   console.warn('❌ Webhook con secreto inválido');
//    res.status(401).json({ message: 'Unauthorized' }); return;
// }
 if (process.env.NODE_ENV === "production") {
  const secret = req.query.secret || req.headers['x-webhook-secret'];
  if (secret !== process.env.MP_WEBHOOK_SECRET) {
    console.warn('❌ Webhook con secreto inválido');
     res.status(401).json({ message: 'Unauthorized' });return;
  }
}

  try {
    const { topic, id } = req.query;
console.log("📩 Webhook recibido", req.method, req.query, req.body);
    if (!topic || !id) {
       res.status(400).json({ message: "Faltan parámetros." }); return ;
    }

    if (topic !== "payment") {
      res.status(200).json({ message: "Evento ignorado." }); return ;
    }

    const paymentClient = new Payment(mpClient);
  const paymentResponse = await paymentClient.get({ id: Number(id) });
  const payment = paymentResponse as PaymentResponse;
  
    const orderId = payment.external_reference;
    if (!orderId) {
       res.status(400).json({ message: "No se encontró referencia externa." }); return ;
    }

    const order = await Orders.findById(orderId);
    if (!order) {
       res.status(404).json({ message: "Orden no encontrada." }); return ;
    }
  
    if (order.status === "approved") {
      console.log("📬 Orden ya aprobada, se ignora para evitar doble envío de email.");
       res.status(200).json({ message: "Orden ya procesada." });return;
    }

    
    if (payment.status === "approved") {
      order.status = "approved";
      order.paymentId = payment.id?.toString();

      // await sendTicketEmail({
      //   to: order.buyerEmail,
      //   name: order.buyerName,
      //   tickets: order.tickets.map(t => ({
      //     code: t.code,
      //     type: t.type
      //   }))
      // });

    } else if (payment.status === "pending") {
      order.status = "pending";
    } else {
      order.status = "rejected";
    }

    await order.save();

    res.status(200).json({ message: "Orden actualizada correctamente." });
  } catch (error) {
    console.error("Error webhook Mercado Pago:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
