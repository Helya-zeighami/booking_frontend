import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
export function Avatar({ name, className }: { name: string; className?: string }) { return <div className={cn("grid size-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700", className)} aria-label={name}>{name ? name.slice(0, 2) : <UserRound className="size-5" />}</div>; }
