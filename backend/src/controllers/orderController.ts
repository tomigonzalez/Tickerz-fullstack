// controllers/orderController.ts
import { Request, Response } from "express";
import Event from "../models/Event";
import Orders from "../models/Orders";



export const getOrdersByEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Evento no encontrado." });return;
    }

    if (event.organizerId.toString() !== userId) {
       res.status(403).json({ message: "No autorizado para ver las órdenes de este evento." });return;
    }

    const orders = await Orders.find({ eventId: id }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las órdenes.", error: (err as Error).message });
  }
};
