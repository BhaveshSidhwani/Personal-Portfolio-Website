import Card from "@/components/Card";
import { projects } from "@/content/projects/projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
