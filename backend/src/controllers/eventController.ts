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

  const {
    title,
    description,
    datetime,
    location,
    city,
    region,
    googleMapsUrl,
    imageUrl,
    ticketTypes
  } = result.data;

  try {
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await Event.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newEvent = new Event({
      title,
      description,
      datetime: new Date(datetime),
      location,
      city,
      region,
      googleMapsUrl,
      imageUrl,
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
        location: savedEvent.location,
        city: savedEvent.city,
        region: savedEvent.region,
        imageUrl: savedEvent.imageUrl,
        googleMapsUrl: savedEvent.googleMapsUrl,
        datetime: savedEvent.datetime,
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

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Evento no encontrado." });
      return;
    }

    if (event.organizerId.toString() !== userId) {
      res.status(403).json({ message: "No autorizado." });
      return;
    }

    await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Evento actualizado." });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar evento." });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Evento no encontrado." });
      return;
    }

    if (event.organizerId.toString() !== userId) {
      res.status(403).json({ message: "No autorizado." });
      return;
    }

    await Event.findByIdAndDelete(id);
    res.json({ message: "Evento eliminado correctamente." });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar evento." });
  }
};

export const getEventBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const event = await Event.findOne({ slug });

    if (!event) {
      res.status(404).json({ message: "Evento no encontrado." });
      return;
    }

    res.json({
      title: event.title,
      description: event.description,
      location: event.location,
      city: event.city,
      region: event.region,
      googleMapsUrl: event.googleMapsUrl,
      imageUrl: event.imageUrl,
      datetime: event.datetime,
      ticketTypes: event.ticketTypes,
      slug: event.slug
    });
  } catch (error) {
    console.error("Error al obtener evento por slug:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
