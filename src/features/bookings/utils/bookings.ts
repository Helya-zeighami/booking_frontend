import type {
  Booking,
  BookingStatus,
  ServiceFilter,
  SortDirection,
  StatusFilter,
  BookingSortField,
} from "../types/booking";

export const statusTransitions: Record<
  BookingStatus,
  readonly BookingStatus[]
> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  cancelled: [],
  completed: [],
};

export function canTransitionStatus(from: BookingStatus, to: BookingStatus) {
  return statusTransitions[from].includes(to);
}

interface BookingFilters {
  searchQuery: string;
  statusFilter: StatusFilter;
  serviceFilter: ServiceFilter;
  sortBy: BookingSortField;
  sortDirection: SortDirection;
}

const normalizeSearch = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[\s-]/g, "")
    .toLocaleLowerCase("fa");

export function selectVisibleBookings(
  bookings: Booking[],
  filters: BookingFilters,
) {
  const query = normalizeSearch(filters.searchQuery);
  return bookings
    .filter(
      (booking) =>
        !query ||
        normalizeSearch(booking.customerName).includes(query) ||
        normalizeSearch(booking.phone).includes(query),
    )
    .filter(
      (booking) =>
        filters.statusFilter === "all" ||
        booking.status === filters.statusFilter,
    )
    .filter(
      (booking) =>
        filters.serviceFilter === "all" ||
        booking.serviceId === filters.serviceFilter,
    )
    .sort((first, second) => {
      const firstValue =
        filters.sortBy === "date" ? `${first.date}T${first.time}` : first.time;
      const secondValue =
        filters.sortBy === "date"
          ? `${second.date}T${second.time}`
          : second.time;
      return (
        firstValue.localeCompare(secondValue) *
        (filters.sortDirection === "asc" ? 1 : -1)
      );
    });
}

export function getBookingStats(bookings: Booking[], today: string) {
  return {
    total: bookings.length,
    today: bookings.filter((booking) => booking.date === today).length,
    confirmed: bookings.filter((booking) => booking.status === "confirmed")
      .length,
    cancelled: bookings.filter((booking) => booking.status === "cancelled")
      .length,
  };
}

export function getTodayInTehran() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function formatPersianDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00+03:30`));
}

export function formatPersianDateTime(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
