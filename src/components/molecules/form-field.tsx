import type { ReactNode } from "react";
import { Label } from "@/components/atoms/label";
import { cn } from "@/lib/utils";

export function FormField({
  id,
  label,
  error,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {optional && <span className="text-xs text-slate-400">{optional}</span>}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-rose-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
