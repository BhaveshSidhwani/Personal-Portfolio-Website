import { notFound } from 'next/navigation';
import { projects } from '@/content/projects/projects';
import TOC from '@/components/TOC';
import Chip from '@/components/Chip';
import Button from '@/components/Button';

export default function CaseStudyPage({ params }: { params: { slug: string }}) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return notFound();

  const toc = project.sections
    .filter(s => s.title && s.id && s.type !== 'image')
    .map(s => ({ id: s.id, label: s.title }));

  return (
    <div className="flex gap-6">
      <article className="flex-1">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="mt-1 text-sm text-[--muted]">
          {project.role} • {project.timeframe}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map(t => <Chip key={t}>{t}</Chip>)}
        </div>
        <div className="mt-4 aspect-[21/9] w-full rounded-md border border-[--border] bg-[--panel]" aria-label="Cover image placeholder" />

        <div className="prose prose-invert:prose-h2:!text-white mt-6 max-w-none">
          {project.sections.map(sec => (
            <section key={sec.id} id={sec.id} className="mb-8 scroll-mt-24">
              <h2 className="mb-2 text-2xl font-bold">{sec.title}</h2>
              {sec.type === 'paragraph' && (
                <p className="text-[--muted]">{sec.content}</p>
              )}
              {sec.type === 'list' && (
                <ul className="list-disc pl-6 text-[--muted]">
                  {sec.items?.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              )}
              {sec.type === 'image' && (
                <div className="rounded-md border border-[--border] bg-[--panel] p-4 text-center text-sm text-[--muted]">
                  Diagram placeholder ({sec.aspect})
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map(m => <Chip key={m} variant="accent">{m}</Chip>)}
        </div>
        <div className="mt-4">
          <Button>Discuss this project</Button>
        </div>
      </article>
      <TOC sections={toc} />
    </div>
  );
}
