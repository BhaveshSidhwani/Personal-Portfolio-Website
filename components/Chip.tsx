import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "neutral" | "accent" | "outline";
};

export default function Chip({
  className,
  children,
  variant = "neutral",
  ...props
}: Props) {
  const base = "inline-flex h-7 items-center rounded-full px-3 text-sm";
  const variants = {
    neutral: "border border-[--border] bg-white text-[--text]",
    accent: "bg-[--accent-500] text-white",
    outline: "border border-[--accent-500] text-[--text]",
  } as const;
  return (
    <div className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
