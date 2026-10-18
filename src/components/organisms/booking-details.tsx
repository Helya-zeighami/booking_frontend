"use client";
import { CalendarDays, Clock3, Phone, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import { ConfirmDialog } from "@/components/molecules/confirm-dialog";
import { StatusBadge } from "@/components/molecules/status-badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBookingStore } from "@/features/bookings/store/booking-store";
import type { Booking, BookingStatus } from "@/features/bookings/types/booking";
import { formatPersianDate, formatPersianDateTime, statusTransitions } from "@/features/bookings/utils/bookings";
import { toPersianDigits } from "@/lib/utils";

function DetailRow({ icon: Icon, label, children, ltr }: { icon: typeof UserRound; label: string; children: React.ReactNode; ltr?: boolean }) { return <div className="flex items-start gap-3"><div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon className="size-4" /></div><div><p className="text-xs text-slate-400">{label}</p><div className="mt-0.5 text-sm font-semibold text-slate-800" dir={ltr ? "ltr" : undefined}>{children}</div></div></div>; }
export function BookingDetails({ booking, open, onOpenChange }: { booking: Booking | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("bookings.details"); const statusT = useTranslations("bookings.status"); const serviceT = useTranslations("bookings.services"); const common = useTranslations("common"); const updateStatus = useBookingStore((s) => s.updateBookingStatus); const liveBooking = useBookingStore((s) => s.bookings.find((candidate) => candidate.id === booking?.id)); const [confirmCancel, setConfirmCancel] = useState(false);
  if (!booking) return null;
  const current = liveBooking ?? booking;
  const transition = (status: BookingStatus) => { const success = updateStatus(current.id, status); if (success) toast.success(t("statusUpdated")); else toast.error(t("invalidTransition")); };
  return <><Dialog open={open} onOpenChange={onOpenChange}><DialogContent><DialogHeader><DialogTitle>{t("title")}</DialogTitle><DialogDescription>{t("description")}</DialogDescription></DialogHeader><div className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="text-xs text-slate-400">{t("status")}</p><div className="mt-1"><StatusBadge status={current.status} /></div></div><span className="text-xs font-medium text-slate-400">#{current.id.slice(-6).toUpperCase()}</span></div><section><h3 className="mb-3 text-sm font-bold text-slate-900">{t("customerInfo")}</h3><div className="grid gap-4 sm:grid-cols-2"><DetailRow icon={UserRound} label={t("customerInfo")}>{current.customerName}</DetailRow><DetailRow icon={Phone} label={t("phone")} ltr>{toPersianDigits(current.phone)}</DetailRow></div></section><Separator /><section><h3 className="mb-3 text-sm font-bold text-slate-900">{t("reservationInfo")}</h3><div className="grid gap-4 sm:grid-cols-2"><DetailRow icon={Sparkles} label={t("service")}>{serviceT(current.serviceId)}</DetailRow><DetailRow icon={CalendarDays} label={t("date")}>{formatPersianDate(current.date)}</DetailRow><DetailRow icon={Clock3} label={t("time")}>{toPersianDigits(current.time)}</DetailRow><DetailRow icon={CalendarDays} label={t("createdAt")}>{formatPersianDateTime(current.createdAt)}</DetailRow></div></section>{current.notes && <><Separator /><section><h3 className="mb-1 text-sm font-bold text-slate-900">{t("notes")}</h3><p className="rounded-lg bg-amber-50 p-3 text-sm leading-6 text-slate-700">{current.notes}</p></section></>}<div className="flex flex-wrap justify-end gap-2">{statusTransitions[current.status].map((status) => status === "cancelled" ? <Button key={status} variant="outline" className="text-rose-600 hover:bg-rose-50" onClick={() => setConfirmCancel(true)}>{statusT(status)}</Button> : <Button key={status} variant={status === "confirmed" ? "success" : "default"} onClick={() => transition(status)}>{statusT(status)}</Button>)}<Button variant="ghost" onClick={() => onOpenChange(false)}>{common("close")}</Button></div></DialogContent></Dialog><ConfirmDialog open={confirmCancel} onOpenChange={setConfirmCancel} title={t("cancelTitle")} description={t("cancelDescription")} confirmLabel={t("cancelConfirm")} onConfirm={() => transition("cancelled")} /></>;
}
