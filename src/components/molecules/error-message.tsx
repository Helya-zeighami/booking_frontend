import { TriangleAlert } from "lucide-react";
export function ErrorMessage({ message }: { message: string }) { return <div role="alert" className="flex gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><TriangleAlert className="mt-0.5 size-4 shrink-0" />{message}</div>; }
