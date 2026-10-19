"use client";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/atoms/input";
import { IconButton } from "@/components/atoms/icon-button";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("bookings.filters");
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchLabel")}
        className="px-10"
      />
      {value && (
        <IconButton
          type="button"
          aria-label={t("clearSearch")}
          onClick={() => onChange("")}
          className="absolute end-1 top-1/2 size-8 -translate-y-1/2"
        >
          <X className="size-4" />
        </IconButton>
      )}
    </div>
  );
}
