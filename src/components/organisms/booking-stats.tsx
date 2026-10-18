"use client";
import { CalendarCheck2, CalendarClock, CalendarX2, ListChecks } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatCard } from "@/components/molecules/stat-card";
import { useBookingStore } from "@/features/bookings/store/booking-store";
import { getBookingStats, getTodayInTehran } from "@/features/bookings/utils/bookings";
export function BookingStats() { const t = useTranslations("bookings.stats"); const bookings = useBookingStore((state) => state.bookings); const stats = getBookingStats(bookings, getTodayInTehran()); return <section aria-label="آمار رزروها" className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard label={t("total")} value={stats.total} helper={t("totalHelper")} icon={ListChecks} accent="indigo" /><StatCard label={t("today")} value={stats.today} helper={t("todayHelper")} icon={CalendarClock} accent="blue" /><StatCard label={t("confirmed")} value={stats.confirmed} helper={t("confirmedHelper")} icon={CalendarCheck2} accent="emerald" /><StatCard label={t("cancelled")} value={stats.cancelled} helper={t("cancelledHelper")} icon={CalendarX2} accent="rose" /></section>; }
