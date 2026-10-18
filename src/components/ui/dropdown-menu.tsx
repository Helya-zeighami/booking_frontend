"use client";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = Dropdown.Trigger;
export function DropdownMenuContent({ className, ...props }: ComponentProps<typeof Dropdown.Content>) { return <Dropdown.Portal><Dropdown.Content sideOffset={6} align="end" className={cn("z-50 min-w-40 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl outline-none", className)} {...props} /></Dropdown.Portal>; }
export function DropdownMenuItem({ className, ...props }: ComponentProps<typeof Dropdown.Item>) { return <Dropdown.Item className={cn("flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-slate-700 outline-none data-[disabled]:opacity-40 data-[highlighted]:bg-slate-100", className)} {...props} />; }
export const DropdownMenuSeparator = ({ className, ...props }: ComponentProps<typeof Dropdown.Separator>) => <Dropdown.Separator className={cn("my-1 h-px bg-slate-200", className)} {...props} />;
