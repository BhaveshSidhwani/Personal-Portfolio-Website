import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Chip from '@/components/Chip';
import Link from 'next/link';
import { projects } from '@/content/projects/projects';

const filters = ['All', 'AI/ML', 'Backend', 'Frontend'];

export default function ProjectsPage() {
  return (
    <>
      <SectionHeader title="Projects & Case Studies" />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map(f => <Chip key={f}>{f}</Chip>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map(p => (
          <Card key={p.slug} title={p.title} impact={p.impactLine} tags={p.tags}>
            <Link className="mt-4 inline-block text-accent-500" href={`/projects/${p.slug}`}>Read case study →</Link>
          </Card>
        ))}
      </div>
    </>
  );
}
