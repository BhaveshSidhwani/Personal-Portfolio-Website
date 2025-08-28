import React from "react";
import Chip from "@/components/Chip";

type Props = {
  title: string;
  impact: string;
  tags?: string[];
  children?: React.ReactNode;
};

export default function Card({ title, impact, tags, children }: Props) {
  return (
    <article className=" flex flex-col rounded-lg border border-[--border] bg-[--panel] p-5 shadow-z1 hover-elevate">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[--muted]">{impact}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags && tags.map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
      {children}
    </article>
  );
}
