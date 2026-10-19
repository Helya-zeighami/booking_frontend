"use client";
import { useState } from "react";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  Menu,
  Settings,
  UsersRound,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/atoms/avatar";
import { IconButton } from "@/components/atoms/icon-button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { key: "bookings", href: "/bookings", icon: CalendarDays },
  { key: "customers", href: "/customers", icon: UsersRound },
  { key: "services", href: "/services", icon: BriefcaseBusiness },
  { key: "reports", href: "/reports", icon: BarChart3 },
  { key: "settings", href: "/settings", icon: Settings },
] as const;

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-300">
      <div className="flex h-18 items-center gap-3 border-b border-white/10 px-5">
        <div className="grid size-9 place-items-center rounded-xl bg-indigo-500 text-white">
          <CalendarDays className="size-5" />
        </div>
        <div>
          <p className="font-extrabold text-white">{common("appName")}</p>
          <p className="text-[11px] text-slate-400">{t("workspace")}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="ناوبری اصلی">
        {navigation.map(({ key, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={key}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "hover:bg-white/5 hover:text-white",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-[18px]" />
              {t(key)}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar name="ا.ر" className="size-9" />
          <div>
            <p className="text-sm font-semibold text-white">الهام رضایی</p>
            <p className="text-xs text-slate-400">مدیر مجموعه</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("header");
  const nav = useTranslations("navigation");
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 lg:block">
        <Sidebar />
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50"
            aria-label="بستن منو"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 start-0 w-[min(82vw,19rem)] shadow-2xl">
            <IconButton
              aria-label="بستن منو"
              className="absolute end-3 top-3 z-10 text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </IconButton>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <IconButton
              aria-label={nav("mobileMenu")}
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </IconButton>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {t("greeting")}
              </p>
              <p className="hidden text-xs text-slate-400 sm:block">
                {t("role")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconButton aria-label={t("notifications")} className="relative">
              <Bell className="size-5" />
              <span className="absolute end-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-rose-500" />
            </IconButton>
            <Avatar name="ا.ر" className="size-9" />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
