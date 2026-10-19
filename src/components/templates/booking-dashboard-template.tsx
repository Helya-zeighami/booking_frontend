"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { BookingDetails } from "@/components/organisms/booking-details";
import { BookingFilters } from "@/components/organisms/booking-filters";
import { BookingForm } from "@/components/organisms/booking-form";
import { BookingStats } from "@/components/organisms/booking-stats";
import { BookingTable } from "@/components/organisms/booking-table";
import { DashboardHeader } from "@/components/organisms/dashboard-header";
import type { Booking } from "@/features/bookings/types/booking";
import { useBookingStore } from "@/features/bookings/store/booking-store";
import { selectVisibleBookings } from "@/features/bookings/utils/bookings";

export function BookingDashboardTemplate() {
  const t = useTranslations("bookings.table");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const bookings = useBookingStore((s) => s.bookings);
  const searchQuery = useBookingStore((s) => s.searchQuery);
  const statusFilter = useBookingStore((s) => s.statusFilter);
  const serviceFilter = useBookingStore((s) => s.serviceFilter);
  const sortBy = useBookingStore((s) => s.sortBy);
  const sortDirection = useBookingStore((s) => s.sortDirection);
  const resetFilters = useBookingStore((s) => s.resetFilters);
  const visibleBookings = useMemo(
    () =>
      selectVisibleBookings(bookings, {
        searchQuery,
        statusFilter,
        serviceFilter,
        sortBy,
        sortDirection,
      }),
    [bookings, searchQuery, statusFilter, serviceFilter, sortBy, sortDirection],
  );
  return (
    <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-6 md:px-6 md:py-8 lg:px-8">
      <DashboardHeader onCreate={() => setFormOpen(true)} />
      <BookingStats />
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,.04)]">
        <div className="px-4 pt-4">
          <h2 className="font-bold text-slate-900">{t("title")}</h2>
        </div>
        <BookingFilters resultCount={visibleBookings.length} />
        <BookingTable
          bookings={visibleBookings}
          totalCount={bookings.length}
          onView={setSelectedBooking}
          onReset={resetFilters}
          onCreate={() => setFormOpen(true)}
        />
      </section>
      <BookingForm open={formOpen} onOpenChange={setFormOpen} />
      <BookingDetails
        booking={selectedBooking}
        open={!!selectedBooking}
        onOpenChange={(open) => {
          if (!open) setSelectedBooking(null);
        }}
      />
    </div>
  );
}
