import SectionHeader from '@/components/SectionHeader';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="About" />
      <p className="text-[--muted]">Paragraph placeholder ~ 220–320 chars. Paragraph placeholder ~ 220–320 chars.</p>
      <p className="text-[--muted]">Paragraph placeholder ~ 220–320 chars. Paragraph placeholder ~ 220–320 chars.</p>

      <SectionHeader title="Snapshot" />
      <ul className="list-disc pl-6 text-[--muted]">
        {['Strength placeholder','Domain placeholder','Toolchain placeholder','Skill placeholder','Interest placeholder','Value prop placeholder'].map(x => <li key={x}>{x}</li>)}
      </ul>

      <SectionHeader title="Timeline" />
      <ul className="text-[--muted]">
        {['Role • Org • 2023–2024','Role • Org • 2022–2023','Role • Org • 2020–2022'].map(x => <li key={x} className="py-1">{x}</li>)}
      </ul>

      <SectionHeader title="Social & CV" />
      <div className="text-accent-500">GitHub  •  LinkedIn  •  Download CV</div>
    </div>
  );
}
