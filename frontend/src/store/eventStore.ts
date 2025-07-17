// /store/eventStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Event, EventFormData } from "@/types/event";

type EventStore = {
  formData: Partial<EventFormData>;
  setField: (field: keyof EventFormData, value: any) => void;
  resetForm: () => void;

  myEvents: Event[];
  setMyEvents: (events: Event[]) => void;

  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
};

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      formData: {
        ticketTypes: []
      },
      setField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value
          }
        })),
      resetForm: () => set({ formData: { ticketTypes: [] } }),

      myEvents: [],
      setMyEvents: (events) => set({ myEvents: events }),

      selectedEvent: null,
      setSelectedEvent: (event) => set({ selectedEvent: event })
    }),
    {
      name: "event-storage" // usa localStorage por defecto
    }
  )
);
