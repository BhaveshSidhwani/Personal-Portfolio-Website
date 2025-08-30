import Button from "@/components/Button";
import Card from "@/components/Card";
import Chip from "@/components/Chip";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/content/projects/projects";
import Image from "next/image";
import Link from "next/link";
import headshot from "../content/images/Headshot.jpeg";

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
          <div className="mt-16 flex gap-3">
            <Button>
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="secondary">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://g7xo711snnm3mcqu.public.blob.vercel-storage.com/Resume/Bhavesh%20Sidhwani_Resume.pdf"
                download
              >
                Resume
              </Link>
            </Button>
          </div>
          <div className="mt-16 flex flex-wrap gap-2">
            <Chip>AI Engineering</Chip>
            <Chip>RAG</Chip>
            <Chip>Full‑stack</Chip>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="sr-only">Headshot</div>
          <Image
            src={headshot}
            alt="Bhavesh Sidhwani - software engineer headshot"
            width={240}
            height={240}
            className="aspect-auto h-60 w-60 rounded-full border-2 border-[--border] bg-[--panel] opacity-95 brightness-95"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="py-4">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <Card
              key={p.slug}
              title={p.title}
              impact={p.impactLine}
              tags={p.tags}
            >
              <Link
                className="mt-4 inline-block text-accent-500"
                href={`/projects/${p.slug}`}
              >
                Read More →
              </Link>
            </Card>
          ))}
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
