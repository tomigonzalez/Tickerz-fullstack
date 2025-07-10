import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  eventId: mongoose.Types.ObjectId;
  ticketType: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  totalAmount: number;
}

const orderSchema = new Schema<IOrder>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    ticketType: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);