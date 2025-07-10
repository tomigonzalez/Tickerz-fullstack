// validations/orderSchema.ts
import { z } from "zod";

export const createOrderSchema = z.object({
  buyerName: z.string().min(1),
  buyerEmail: z.string().email(),
  buyerDNI: z.string().min(6), // puede ser z.string().regex(...) si querés validar formato
  buyerPhone: z.string().min(6),
  tickets: z.array(
    z.object({
      ticketType: z.string(),
      quantity: z.number().int().positive()
    })
  )
});