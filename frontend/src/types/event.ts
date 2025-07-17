// /types/event.ts

export type TicketType = {
  name: string;
  price: number;
  stock: number;
};

export type EventFormData = {
  title: string;
  description?: string;
  datetime: string;
  location: string;
  city: string;
  region: string;
  googleMapsUrl?: string;
  imageUrl?: string;
  ticketTypes: TicketType[];
};

export type Event = EventFormData & {
  _id: string;
  slug: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
};
