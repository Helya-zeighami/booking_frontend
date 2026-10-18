import { setRequestLocale } from "next-intl/server";
import { BookingDashboardTemplate } from "@/components/templates/booking-dashboard-template";
export default async function BookingsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; setRequestLocale(locale); return <BookingDashboardTemplate />; }
