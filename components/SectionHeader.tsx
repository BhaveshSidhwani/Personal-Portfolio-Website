import clsx from "clsx";
import React from "react";

export default function SectionHeader({
  title,
  subtitle,
  position = "left",
}: {
  title: string;
  subtitle?: string;
  position?: "left" | "center" | "right";
}) {
  const base = "mb-4";

  const positions = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  } as const;

  return (
    <div className={clsx(base, positions[position])}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-[--muted]">{subtitle}</p>}
    </div>
  );
}
