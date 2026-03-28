import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.string().min(1, "At least 1 guest"),
  requests: z.string().optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export function useCreateReservation() {
  return useMutation({
    mutationFn: async (data: ReservationInput) => {
      // 1. Format the WhatsApp message with reservation details
      const text = `*New Table Reservation Request* 🍽️
      
*Name:* ${data.name}
*Phone:* ${data.phone}
*Date:* ${data.date}
*Time:* ${data.time}
*Guests:* ${data.guests}
*Special Requests:* ${data.requests || 'None'}

Please confirm my booking.`;
      
      const whatsappUrl = `https://wa.me/918108259655?text=${encodeURIComponent(text)}`;
      
      // 2. Mock API call to satisfy architecture patterns - silently fails if backend is omitted
      try {
        await fetch('/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.warn('API missing, proceeding to WhatsApp directly');
      }

      // 3. Open WhatsApp connection
      window.open(whatsappUrl, '_blank');
      
      return { success: true, url: whatsappUrl };
    }
  });
}
