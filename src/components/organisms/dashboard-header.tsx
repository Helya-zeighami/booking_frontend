"use client";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/button";
import { Heading, Text } from "@/components/atoms/typography";
export function DashboardHeader({ onCreate }: { onCreate: () => void }) { const t = useTranslations("bookings.page"); return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><Heading>{t("title")}</Heading><Text className="mt-1">{t("description")}</Text></div><Button size="lg" onClick={onCreate} className="w-full sm:w-auto"><Plus className="size-4" />{t("newBooking")}</Button></div>; }
