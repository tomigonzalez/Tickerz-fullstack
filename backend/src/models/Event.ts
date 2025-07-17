import mongoose, { Schema, Document } from "mongoose";

interface TicketType {
  name: string;
  price: number;
  stock: number;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  datetime: Date;
  location: string; // Dirección exacta
  city: string; // Localidad
  region: string; // Provincia o país
  googleMapsUrl?: string; // Opcional
  imageUrl?: string; // Opcional
  slug: string;
  ticketTypes: TicketType[];
  organizerId: mongoose.Types.ObjectId;
}

const ticketTypeSchema = new Schema<TicketType>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  datetime: { type: Date, required: true },
  location: { type: String, required: true },  // Dirección exacta
  city: { type: String, required: true }, // Localidad
  region: { type: String, required: true }, // Provincia o país
  googleMapsUrl: { type: String },  // Opcional
  imageUrl: { type: String }, // Opcional
  slug: { type: String, required: true, unique: true },
  ticketTypes: { type: [ticketTypeSchema], required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

export default mongoose.model<IEvent>("Event", eventSchema);
