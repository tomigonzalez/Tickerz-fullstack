// controllers/orderController.ts
import { Request, Response } from "express";
import Event from "../models/Event";
import Orders from "../models/Orders";
import { createOrderSchema } from "../validations/orderSchema";
import { nanoid } from "nanoid";

export const getOrdersByEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const event = await Event.findById(id);
    if (!event) { res.status(404).json({ message: "Evento no encontrado." });return;}

    if (event.organizerId.toString() !== userId){
       res.status(403).json({ message: "No autorizado para ver las órdenes de este evento." });return;}

    const orders = await Orders.find({ eventId: id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las órdenes.", error: (err as Error).message });
  }
};

// POST /purchase/:slug
export const purchaseTicket = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const validation = createOrderSchema.safeParse(req.body);

  if (!validation.success) {
     res.status(400).json({ errors: validation.error.flatten().fieldErrors });return;
  }

  const { buyerName, buyerEmail, buyerDNI, buyerPhone, tickets } = validation.data;

  try {
    const event = await Event.findOne({ slug });
    if (!event){ res.status(404).json({ message: "Evento no encontrado." });return;}

    let totalAmount = 0;
    const updatedTickets = [...event.ticketTypes];
    const orderTickets: {
      code: string;
      type: string;
      price: number;
      used: boolean;
    }[] = [];

    for (const item of tickets) {
      const ticket = updatedTickets.find(t => t.name === item.ticketType);
      if (!ticket){ res.status(400).json({ message: `Tipo de ticket '${item.ticketType}' no válido.` });return;}

      if (ticket.stock < item.quantity){
        res.status(400).json({ message: `Stock insuficiente para '${item.ticketType}'.` });return;}

      ticket.stock -= item.quantity;
      totalAmount += ticket.price * item.quantity;

      for (let i = 0; i < item.quantity; i++) {
        orderTickets.push({
          code: `TCK-${nanoid(8).toUpperCase()}`,
          type: ticket.name,
          price: ticket.price,
          used: false
        });
      }
    }

    event.ticketTypes = updatedTickets;
    await event.save();

    const generateOrderCode = () => `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newOrder = new Orders({
      eventId: event._id,
      buyerName,
      buyerEmail,
      buyerDNI,
      buyerPhone,
      tickets: orderTickets,
      totalAmount,
      code: generateOrderCode(),
      status: "pending"
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Compra realizada con éxito.",
      orderId: savedOrder._id,
      code: savedOrder.code,
      totalAmount,
      tickets: orderTickets
    });

  } catch (err) {
    console.error("Error al procesar la compra:", err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Orders.findById(id);
    if (!order) { res.status(404).json({ message: "Orden no encontrada." });return;}

    const event = await Event.findById(order.eventId);
    if (!event) { res.status(404).json({ message: "Evento vinculado no encontrado." });return;}

    res.json({
      orderId: order._id,
      buyerName: order.buyerName,
      buyerEmail: order.buyerEmail,
      buyerDNI: order.buyerDNI,
      buyerPhone: order.buyerPhone,
      totalAmount: order.totalAmount,
      tickets: order.tickets,
      event: {
        title: event.title,
        datetime: event.datetime,
        location: event.location
      },
      createdAt: order.createdAt
    });

  } catch (err) {
    console.error("Error al obtener la orden:", err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getOrderByCode = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const order = await Orders.findOne({ code });
    if (!order) { res.status(404).json({ message: "Orden no encontrada con ese código." });return;}

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar la orden.", error: (err as Error).message });
  }
};
