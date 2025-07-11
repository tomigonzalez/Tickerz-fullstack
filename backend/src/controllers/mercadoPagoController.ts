// controllers/mercadoPagoController.ts
import { Request, Response } from "express";
import { Preference as PreferenceClient } from "mercadopago/dist/clients/preference";
import type { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";


import Orders from "../models/Orders";
import mpClient from "../config/mercadoPago";

export const createPaymentPreference = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await Orders.findById(orderId);
    if (!order) {
     res.status(404).json({ message: "Orden no encontrada." }); return ;
    }
   
console.log("Order encontrada:", order);
    const preferenceData: PreferenceRequest = {
      items: [
        {
            title: `Entradas para evento`,
            quantity: 1,
            currency_id: "ARS",
            unit_price: order.totalAmount,
            id: ""
        },
      ],
      payer: {
        name: order.buyerName,
        email: order.buyerEmail,
      },
      external_reference: order._id?.toString(),
      notification_url: `${process.env.FRONT_URL}/api/webhooks/mercadopago`,
      back_urls: {
        success: `${process.env.FRONT_URL}/success?order=${order.code}`,
        failure: `${process.env.FRONT_URL}/failure`,
        pending: `${process.env.FRONT_URL}/pending`,
      },
      auto_return: "approved",
    };
console.log("Datos de la preferencia a enviar a Mercado Pago:", JSON.stringify(preferenceData, null, 2));
    const preferenceClient = new PreferenceClient(mpClient);
    const response = await preferenceClient.create({ body: preferenceData });

    res.json({ init_point: response.init_point });
  } catch (err) {
    console.error("Error al crear preferencia:", err);
    res.status(500).json({ message: "Error al crear preferenciaa de pago." });
  }
};