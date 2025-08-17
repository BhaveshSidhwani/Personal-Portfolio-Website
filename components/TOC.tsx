'use client';
import React, { useEffect, useState } from 'react';

export default function TOC({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <aside className="sticky top-24 hidden h-max w-64 shrink-0 rounded-lg border border-[--border] bg-white p-4 lg:block">
      <div className="text-sm font-semibold">On this page</div>
      <nav className="mt-3 space-y-2">
        {sections.map(s => (
          <a key={s.id} href={'#' + s.id} className={`block text-sm ${active === s.id ? 'text-[--text]' : 'text-[--muted]'}`}>
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
