import mongoose, { Schema, Document } from "mongoose";

interface IndividualTicket {
  code: string;
  type: string;
  price: number;
  used: boolean;
}

export interface IOrder extends Document {
  eventId: mongoose.Types.ObjectId;
  buyerName: string;
  buyerEmail: string;
  buyerDNI: string;
  buyerPhone: string;
  tickets: IndividualTicket[];
  totalAmount: number;
  code: string;
  status: "pending" | "approved" | "rejected";
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const individualTicketSchema = new Schema<IndividualTicket>({
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  used: { type: Boolean, default: false }
});

const orderSchema = new Schema<IOrder>(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerDNI: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    tickets: [individualTicketSchema],
    totalAmount: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    paymentId: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);