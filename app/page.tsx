import Button from "@/components/Button";
import Card from "@/components/Card";
import Chip from "@/components/Chip";
import SectionHeader from "@/components/SectionHeader";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-8 py-8 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold">Your Name</h1>
          <p className="mt-2 text-lg text-[--muted]">
            Value proposition placeholder text ~ 90–110 chars for layout realism
            across breakpoints.
          </p>
          <div className="mt-4 flex gap-3">
            <Button>View Projects</Button>
            <Button variant="secondary">Contact</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip>AI Engineering</Chip>
            <Chip>RAG</Chip>
            <Chip>Full‑stack</Chip>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div
            className="aspect-square h-60 w-60 rounded-full border border-[--border] bg-[--panel]"
            aria-label="Headshot placeholder"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="py-4">
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="Project A"
            impact="Outcome placeholder: metrics ~ 60–80 chars, consistent height for layout fidelity."
          >
            <div className="mt-4 text-accent-500">Read case study →</div>
          </Card>
          <Card
            title="Project B"
            impact="Outcome placeholder: metrics ~ 60–80 chars, consistent height for layout fidelity."
          >
            <div className="mt-4 text-accent-500">Read case study →</div>
          </Card>
        </div>
      </section>

      {/* Skills Snapshot */}
      <section className="py-6">
        <SectionHeader title="Skills Snapshot" />
        <div className="flex flex-wrap gap-2">
          {[
            "AI Engineering",
            "RAG",
            "Embeddings",
            "Go",
            "Python",
            "Next.js",
            "Docker",
            "CI/CD",
          ].map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="py-6">
        <SectionHeader title="About Teaser" />
        <p className="text-sm text-[--muted]">
          Two‑sentence placeholder ~ 140–180 chars to mimic final copy length.
        </p>
        <div className="mt-2 text-accent-500">Read more →</div>
      </section>

      {/* CTA strip */}
      <section className="mt-6 rounded-lg border border-[--border] bg-[--panel] p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Call‑to‑action placeholder ~ 45–65 chars
          </div>
          <Button>Contact</Button>
        </div>
      </section>
    </>
  );
}
