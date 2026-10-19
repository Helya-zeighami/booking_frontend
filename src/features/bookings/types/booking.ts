export const bookingStatuses = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const serviceIds = [
  "haircut",
  "color",
  "facial",
  "nails",
  "consultation",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  serviceId: ServiceId;
  date: string;
  time: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingSortField = "date" | "time";
export type SortDirection = "asc" | "desc";
export type StatusFilter = "all" | BookingStatus;
export type ServiceFilter = "all" | ServiceId;
