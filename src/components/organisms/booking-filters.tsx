"use client";
import { ArrowDownAZ, ArrowUpAZ, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/button";
import { SearchInput } from "@/components/molecules/search-input";
import {
  bookingStatuses,
  serviceIds,
  type BookingSortField,
  type BookingStatus,
  type ServiceId,
  type SortDirection,
} from "@/features/bookings/types/booking";
import { useBookingStore } from "@/features/bookings/store/booking-store";

const selectClass =
  "h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
export function BookingFilters({ resultCount }: { resultCount: number }) {
  const t = useTranslations("bookings.filters");
  const statusT = useTranslations("bookings.status");
  const serviceT = useTranslations("bookings.services");
  const searchQuery = useBookingStore((s) => s.searchQuery);
  const statusFilter = useBookingStore((s) => s.statusFilter);
  const serviceFilter = useBookingStore((s) => s.serviceFilter);
  const sortBy = useBookingStore((s) => s.sortBy);
  const sortDirection = useBookingStore((s) => s.sortDirection);
  const setSearchQuery = useBookingStore((s) => s.setSearchQuery);
  const setStatusFilter = useBookingStore((s) => s.setStatusFilter);
  const setServiceFilter = useBookingStore((s) => s.setServiceFilter);
  const setSortBy = useBookingStore((s) => s.setSortBy);
  const setSortDirection = useBookingStore((s) => s.setSortDirection);
  const resetFilters = useBookingStore((s) => s.resetFilters);
  const active =
    searchQuery ||
    statusFilter !== "all" ||
    serviceFilter !== "all" ||
    sortBy !== "date" ||
    sortDirection !== "asc";
  return (
    <div className="space-y-3 border-b border-slate-200 p-4">
      <div className="flex flex-col gap-2 xl:flex-row">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <select
            aria-label={t("status")}
            className={selectClass}
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | BookingStatus)
            }
          >
            <option value="all">{statusT("all")}</option>
            {bookingStatuses.map((status) => (
              <option key={status} value={status}>
                {statusT(status)}
              </option>
            ))}
          </select>
          <select
            aria-label={t("service")}
            className={selectClass}
            value={serviceFilter}
            onChange={(e) =>
              setServiceFilter(e.target.value as "all" | ServiceId)
            }
          >
            <option value="all">{serviceT("all")}</option>
            {serviceIds.map((service) => (
              <option key={service} value={service}>
                {serviceT(service)}
              </option>
            ))}
          </select>
          <select
            aria-label={t("sortBy")}
            className={selectClass}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as BookingSortField)}
          >
            <option value="date">{t("sortDate")}</option>
            <option value="time">{t("sortTime")}</option>
          </select>
          <Button
            variant="outline"
            size="icon"
            aria-label={
              sortDirection === "asc" ? t("ascending") : t("descending")
            }
            title={sortDirection === "asc" ? t("ascending") : t("descending")}
            onClick={() =>
              setSortDirection(
                (sortDirection === "asc" ? "desc" : "asc") as SortDirection,
              )
            }
          >
            {sortDirection === "asc" ? (
              <ArrowUpAZ className="size-4" />
            ) : (
              <ArrowDownAZ className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-slate-500" aria-live="polite">
          {t("resultCount", { count: resultCount })}
        </p>
        {active && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="size-3.5" />
            {t("clear")}
          </Button>
        )}
      </div>
    </div>
  );
}
