import { CalendarDays, Clock3 } from "lucide-react";
import { toPersianDigits } from "@/lib/utils";
import { formatPersianDate } from "@/features/bookings/utils/bookings";
export function DateDisplay({ date, time }: { date: string; time: string }) { return <div className="space-y-1 text-sm"><span className="flex items-center gap-1.5 font-medium text-slate-700"><CalendarDays className="size-3.5 text-slate-400" />{formatPersianDate(date)}</span><span className="flex items-center gap-1.5 text-xs text-slate-500"><Clock3 className="size-3.5 text-slate-400" />{toPersianDigits(time)}</span></div>; }
