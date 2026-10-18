import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva("flex w-full rounded-lg border bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500", {
  variants: {
    state: { default: "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100", error: "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100" },
    inputSize: { default: "h-10 px-3", lg: "h-11 px-3.5" },
  },
  defaultVariants: { state: "default", inputSize: "default" },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, state, inputSize, ...props }, ref) => <input ref={ref} className={cn(inputVariants({ state, inputSize }), className)} {...props} />);
Input.displayName = "Input";
