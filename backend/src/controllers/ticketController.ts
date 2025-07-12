import { Request, Response } from "express";
import Orders from "../models/Orders";


export const validateTicket = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const order = await Orders.findOne({ "tickets.code": code });

    if (!order) {
      res.status(404).json({ valid: false, message: "❌ Ticket no encontrado" });return;
    }

    const ticket = order.tickets.find(t => t.code === code);

    if (!ticket) {
       res.status(404).json({ valid: false, message: "❌ Ticket inválido" });return;
    }

    if (ticket.used) {
      res.status(409).json({
        valid: false,
        message: "⚠️ Ticket ya fue utilizado",
        type: ticket.type,
        code: ticket.code,
        buyer: order.buyerName,
      });
       return;
    }

    // Marcar como usado
    ticket.used = true;
    await order.save();

    res.json({
      valid: true,
      message: `✅ Aprobado - Entrada ${ticket.type}`,
      type: ticket.type,
      code: ticket.code,
      buyer: order.buyerName,
    });return;

  } catch (err) {
    console.error("Error validando ticket:", err);
    res.status(500).json({ valid: false, message: "Error interno" });return ;
  }
};
