import clsx from "clsx";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  // Common styles
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--accent-500]";

  // Size styles
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-8 text-base",
    lg: "h-[52px] px-5 text-lg",
  } as const;

  // Variant styles
  const variants = {
    primary: "bg-[--accent-500] text-white hover:bg-[--accent-600]",
    secondary:
      "bg-[--panel] text-[--text] border border-[--border] hover:bg-white",
    ghost: "bg-transparent text-[--text] hover:bg-[--panel]",
  } as const;

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
