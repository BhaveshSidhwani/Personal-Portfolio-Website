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
          <h1 className="text-5xl font-bold">Bhavesh Sidhwani</h1>
          <p className="mt-2 text-lg text-[--muted]">
            Software Engineer with strong background in full-stack, AI and
            cloud.
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
            title="Cloud Observability and Insights"
            impact="Go-based infrastructure monitoring and insights platform with AI-driven management."
            tags={[
              "Go",
              "Python",
              "RAG",
              "OpenAI",
              "AzureAI",
              "Gemini",
              "Docker",
              "AWS",
              "GCP",
              "Azure",
            ]}
          >
            <div className="mt-4 text-accent-500">Read case study →</div>
          </Card>
          <Card
            title="ASL Recognition"
            impact="Real-time American Sign Language recognition using CNN and transfer learning."
            tags={["Python", "TensorFlow", "Keras", "PyTorch", "CV2"]}
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
            "Java",
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
    </>
  );
}
