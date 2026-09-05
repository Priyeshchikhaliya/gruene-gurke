import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "light" | "outlineLight" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-forest-700 active:scale-[0.98]",
  outline:
    "border border-forest-800/30 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-cream-50 active:scale-[0.98]",
  ghost: "text-forest-900 hover:bg-forest-800/5",
  light: "bg-cream-50 text-forest-900 hover:bg-cream-200 active:scale-[0.98]",
  outlineLight:
    "border border-cream-50/40 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-forest-900 active:scale-[0.98]",
  gold: "bg-gold-500 text-forest-950 hover:bg-gold-400 active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/** Class string for buttons and button-styled links. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
