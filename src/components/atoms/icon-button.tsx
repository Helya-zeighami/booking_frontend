import type { ButtonProps } from "./button";
import { Button } from "./button";
export function IconButton({ "aria-label": ariaLabel, ...props }: ButtonProps) {
  return (
    <Button size="icon" variant="ghost" aria-label={ariaLabel} {...props} />
  );
}
