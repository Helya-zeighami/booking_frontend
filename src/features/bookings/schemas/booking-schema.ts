import { z } from "zod";
import { serviceIds } from "../types/booking";

export function createBookingSchema(today: string) {
  return z.object({
    customerName: z
      .string()
      .trim()
      .min(2, "نام مشتری باید حداقل ۲ حرف باشد")
      .max(80, "نام مشتری بیش از حد طولانی است"),
    phone: z
      .string()
      .trim()
      .regex(/^09\d{9}$/, "شماره تماس باید ۱۱ رقم و با ۰۹ آغاز شود"),
    serviceId: z.enum(serviceIds, { error: "نوع خدمت را انتخاب کنید" }),
    date: z
      .string()
      .min(1, "تاریخ رزرو را وارد کنید")
      .refine(
        (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
        "تاریخ رزرو معتبر نیست",
      )
      .refine((date) => date >= today, "امکان ثبت رزرو در گذشته وجود ندارد"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت رزرو معتبر نیست"),
    notes: z
      .string()
      .trim()
      .max(500, "توضیحات حداکثر می‌تواند ۵۰۰ حرف باشد")
      .optional(),
  });
}

export type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;
