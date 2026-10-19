"use client";
import { CircleCheck, CircleDashed, CircleX, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/atoms/badge";
import type { BookingStatus } from "@/features/bookings/types/booking";

const config = {
  pending: { variant: "warning", Icon: CircleDashed },
  confirmed: { variant: "success", Icon: CircleCheck },
  cancelled: { variant: "destructive", Icon: CircleX },
  completed: { variant: "secondary", Icon: CheckCheck },
} as const;

export function StatusBadge({ status }: { status: BookingStatus }) {
  const t = useTranslations("bookings.status");
  const { variant, Icon } = config[status];
  return (
    <Badge variant={variant}>
      <Icon className="size-3.5" aria-hidden="true" />
      {t(status)}
    </Badge>
  );
}
