import React from 'react';
import Chip from '@/components/Chip';

type Props = {
  title: string;
  impact: string;
  tags?: string[];
  children?: React.ReactNode;
};

export default function Card({ title, impact, tags = ['AI/ML', 'RAG', 'Python', 'Next.js'], children }: Props) {
  return (
    <article className="rounded-lg border border-[--border] bg-white p-5 shadow-z1 hover-elevate">
      <div className="mb-4 aspect-[16/9] w-full rounded-md border border-[--border] bg-[--panel]" aria-hidden />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[--muted]">{impact}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => <Chip key={t}>{t}</Chip>)}
      </div>
      {children}
    </article>
  );
}
