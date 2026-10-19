import type { LucideIcon } from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";

const accents = {
  indigo: "bg-indigo-50 text-indigo-600",
  blue: "bg-sky-50 text-sky-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};
export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  helper: string;
  icon: LucideIcon;
  accent: keyof typeof accents;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,.03)] md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums text-slate-950">
            {toPersianDigits(value)}
          </p>
        </div>
        <div
          className={cn(
            "grid size-10 place-items-center rounded-xl",
            accents[accent],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{helper}</p>
    </article>
  );
}
