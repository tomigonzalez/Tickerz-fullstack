import { z } from "zod";

export const ticketTypeSchema = z.object({
  name: z.string().min(1, "El nombre del ticket es requerido"),
  price: z.number().min(0, "El precio debe ser positivo"),
  stock: z.number().int().min(1, "Debe haber al menos 1 entrada")
});

export const createEventSchema = z.object({
  title: z.string().min(3, "El título es requerido"),
  description: z.string().optional(),
  datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida",
  }),
  location: z.string().min(1, "Ubicación requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  region: z.string().min(1, "La provincia o país es requerido"),
  googleMapsUrl: z.string().url("Debe ser una URL válida").optional(),
  imageUrl: z.string().url("Debe ser una URL válida").optional(),
  ticketTypes: z.array(ticketTypeSchema).min(1, "Al menos un tipo de entrada")
});
