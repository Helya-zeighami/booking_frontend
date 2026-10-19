import { ArrowRight, Construction } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/atoms/button";

const allowedSections = new Set([
  "overview",
  "customers",
  "services",
  "reports",
  "settings",
]);
export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { section } = await params;
  const t = await getTranslations("navigation");
  if (!allowedSections.has(section)) return null;
  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Construction className="size-7" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          {t("placeholderTitle")}
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          {t("placeholderDescription")}
        </p>
        <Link
          href="/bookings"
          className={`${buttonVariants({ variant: "default" })} mt-6`}
        >
          <ArrowRight className="size-4" />
          {t("backToBookings")}
        </Link>
      </div>
    </div>
  );
}
