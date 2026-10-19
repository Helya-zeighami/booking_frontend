import { create } from "zustand";
import { initialBookings } from "../data/mock-bookings";
import type {
  Booking,
  BookingSortField,
  BookingStatus,
  ServiceFilter,
  SortDirection,
  StatusFilter,
} from "../types/booking";
import { canTransitionStatus } from "../utils/bookings";

interface BookingState {
  bookings: Booking[];
  searchQuery: string;
  statusFilter: StatusFilter;
  serviceFilter: ServiceFilter;
  sortBy: BookingSortField;
  sortDirection: SortDirection;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => boolean;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setServiceFilter: (service: ServiceFilter) => void;
  setSortBy: (field: BookingSortField) => void;
  setSortDirection: (direction: SortDirection) => void;
  resetFilters: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: initialBookings,
  searchQuery: "",
  statusFilter: "all",
  serviceFilter: "all",
  sortBy: "date",
  sortDirection: "asc",
  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  updateBookingStatus: (id, status) => {
    const booking = get().bookings.find((candidate) => candidate.id === id);
    if (!booking || !canTransitionStatus(booking.status, status)) return false;
    set((state) => ({
      bookings: state.bookings.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate,
      ),
    }));
    return true;
  },
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setServiceFilter: (serviceFilter) => set({ serviceFilter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
  resetFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      serviceFilter: "all",
      sortBy: "date",
      sortDirection: "asc",
    }),
}));
