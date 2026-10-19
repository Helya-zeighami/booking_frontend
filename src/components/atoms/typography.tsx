import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Heading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl",
        className,
      )}
      {...props}
    />
  );
}
export function Text({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-6 text-slate-500", className)}
      {...props}
    />
  );
}
