"use client";
import { useMemo, type FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Spinner } from "@/components/atoms/spinner";
import { FormField } from "@/components/molecules/form-field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createBookingSchema,
  type BookingFormValues,
} from "@/features/bookings/schemas/booking-schema";
import { useBookingStore } from "@/features/bookings/store/booking-store";
import { serviceIds } from "@/features/bookings/types/booking";
import { getTodayInTehran } from "@/features/bookings/utils/bookings";

const controlClass =
  "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export function BookingForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("bookings.form");
  const common = useTranslations("common");
  const serviceT = useTranslations("bookings.services");
  const addBooking = useBookingStore((state) => state.addBooking);
  const today = getTodayInTehran();
  const schema = useMemo(() => createBookingSchema(today), [today]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: "",
      phone: "",
      serviceId: undefined,
      date: "",
      time: "",
      notes: "",
    },
  });
  const submit = handleSubmit(async (values) => {
    await Promise.resolve();
    addBooking({
      id: crypto.randomUUID(),
      ...values,
      notes: values.notes || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    toast.success(t("success"));
    reset();
    onOpenChange(false);
  });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isSubmitting) onOpenChange(next);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          noValidate
          className="grid gap-4 sm:grid-cols-2"
        >
          <FormField
            id="customerName"
            label={t("customerName")}
            error={errors.customerName?.message}
          >
            <Input
              id="customerName"
              autoComplete="name"
              placeholder={t("customerPlaceholder")}
              state={errors.customerName ? "error" : "default"}
              aria-invalid={!!errors.customerName}
              aria-describedby={
                errors.customerName ? "customerName-error" : undefined
              }
              {...register("customerName")}
            />
          </FormField>
          <FormField
            id="phone"
            label={t("phone")}
            error={errors.phone?.message}
          >
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              dir="ltr"
              autoComplete="tel"
              placeholder={t("phonePlaceholder")}
              state={errors.phone ? "error" : "default"}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
          </FormField>
          <FormField
            id="serviceId"
            label={t("service")}
            error={errors.serviceId?.message}
            className="sm:col-span-2"
          >
            <select
              id="serviceId"
              className={controlClass}
              aria-invalid={!!errors.serviceId}
              aria-describedby={
                errors.serviceId ? "serviceId-error" : undefined
              }
              {...register("serviceId")}
            >
              <option value="">{t("selectService")}</option>
              {serviceIds.map((service) => (
                <option key={service} value={service}>
                  {serviceT(service)}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="date" label={t("date")} error={errors.date?.message}>
            <Input
              id="date"
              type="date"
              min={today}
              dir="ltr"
              state={errors.date ? "error" : "default"}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
              {...register("date")}
            />
          </FormField>
          <FormField id="time" label={t("time")} error={errors.time?.message}>
            <Input
              id="time"
              type="time"
              dir="ltr"
              state={errors.time ? "error" : "default"}
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
              {...register("time")}
            />
          </FormField>
          <FormField
            id="notes"
            label={t("notes")}
            optional={common("optional")}
            error={errors.notes?.message}
            className="sm:col-span-2"
          >
            <textarea
              id="notes"
              rows={3}
              placeholder={t("notesPlaceholder")}
              className="flex w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              aria-invalid={!!errors.notes}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              {...register("notes")}
            />
          </FormField>
          <div className="mt-2 flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {common("cancel")}
            </Button>
            <Button
              type="submit"
              onPointerDown={(event) => event.stopPropagation()}
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
