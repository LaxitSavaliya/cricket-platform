import { Loader2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive" | "subtle";

export type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white shadow-xs hover:bg-zinc-800 active:bg-zinc-950 focus-visible:ring-zinc-900",
  secondary:
    "border border-zinc-200 bg-white text-zinc-800 shadow-xs hover:bg-zinc-50 hover:border-zinc-300 active:bg-zinc-100 focus-visible:ring-zinc-400",
  outline:
    "border border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 focus-visible:ring-zinc-400",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 focus-visible:ring-zinc-400",
  destructive:
    "bg-red-600 text-white shadow-xs hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
  subtle:
    "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-200/80 focus-visible:ring-zinc-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-9.5 px-4 text-xs font-semibold rounded-xl gap-2",
  lg: "h-11 px-5 text-sm font-semibold rounded-xl gap-2.5",
  icon: "h-9.5 w-9.5 p-0 rounded-xl justify-center shrink-0",
  "icon-sm": "h-7.5 w-7.5 p-0 rounded-lg justify-center shrink-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all select-none cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0 text-current" />
            {loadingText ? <span>{loadingText}</span> : children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
