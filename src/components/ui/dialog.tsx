"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] data-[state=open]:animate-in" /><DialogPrimitive.Content dir="rtl" className={cn("fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl outline-none sm:p-6", className)} {...props}>{children}<DialogPrimitive.Close className="absolute end-4 top-4 grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="بستن"><X className="size-4" /></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;
}
export function DialogHeader({ className, ...props }: ComponentProps<"div">) { return <div className={cn("mb-5 pe-9", className)} {...props} />; }
export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) { return <DialogPrimitive.Title className={cn("text-lg font-bold text-slate-950", className)} {...props} />; }
export function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) { return <DialogPrimitive.Description className={cn("mt-1 text-sm leading-6 text-slate-500", className)} {...props} />; }
