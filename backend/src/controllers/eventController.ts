import { Request, Response } from "express";
import Event from "../models/Event";
import { createEventSchema } from "../validations/eventSchema";
import slugify from "slugify";

export const createEvent = async (req: Request, res: Response) => {
  const user = (req as any).user; // del middleware verifyToken

  if (!user) {
    res.status(401).json({ message: "No autorizado." });
     return;
  }

  const result = createEventSchema.safeParse(req.body);
  if (!result.success) {
     res.status(400).json({ errors: result.error.flatten().fieldErrors });
     return;
  }

  const { title, description, datetime, location, ticketTypes } = result.data;

  try {
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Asegurar que el slug sea único
    while (await Event.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newEvent = new Event({
      title,
      description,
      datetime: new Date(datetime),
      location,
      slug,
      ticketTypes,
      organizerId: user.id
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      message: "Evento creado exitosamente",
      event: {
        id: savedEvent._id,
        slug: savedEvent.slug,
        title: savedEvent.title,
        ticketTypes: savedEvent.ticketTypes
      }
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getMyEvents = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
     res.status(401).json({ message: "No autorizado." });
     return;
  }

  try {
    const events = await Event.find({ organizerId: user.id }).sort({ createdAt: -1 });

    res.json({
      count: events.length,
      events
    });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};