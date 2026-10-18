import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { ProgressProvider } from "@/components/layout/progress-provider";
import { DashboardLayout } from "@/components/templates/dashboard-layout";
import { routing } from "@/i18n/routing";
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}><ProgressProvider><DashboardLayout>{children}</DashboardLayout><Toaster position="bottom-left" dir="rtl" richColors closeButton /></ProgressProvider></NextIntlClientProvider>;
}
