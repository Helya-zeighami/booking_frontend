import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { ProgressProvider } from "@/components/layout/progress-provider";
import { DashboardLayout } from "@/components/templates/dashboard-layout";
import { routing } from "@/i18n/routing";
import "../globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "نوبان | مدیریت رزروها",
  description: "داشبورد حرفه‌ای مدیریت رزرو",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} dir="rtl" className={vazirmatn.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ProgressProvider>
            <DashboardLayout>{children}</DashboardLayout>
            <Toaster position="bottom-left" dir="rtl" richColors closeButton />
          </ProgressProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
