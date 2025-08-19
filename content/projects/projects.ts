export type CaseSection = {
  id: string;
  title: string;
  type: "paragraph" | "list" | "image";
  content?: string;
  items?: string[];
  aspect?: "16:9" | "21:9" | "3:2";
};

export type Project = {
  slug: string;
  title: string;
  impactLine: string;
  tags: string[];
  timeframe: string;
  role: string;
  metrics: string[];
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "project-a",
    title: "Project A",
    impactLine:
      "Outcome placeholder: metrics ~ 60–80 chars, consistent height for layout fidelity.",
    tags: ["AI/ML", "RAG", "Python", "Next.js"],
    timeframe: "2024",
    role: "Software & AI Engineer",
    metrics: ["Metric A", "Metric B", "Metric C"],
    sections: [
      {
        id: "context",
        title: "Context",
        type: "paragraph",
        content:
          "Paragraph placeholder ~ 220–280 chars for realistic reading width across breakpoints.",
      },
      {
        id: "problem",
        title: "Problem",
        type: "list",
        items: [
          "Bullet placeholder 60–80 chars",
          "Bullet placeholder 60–80 chars",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        type: "paragraph",
        content:
          "Paragraph placeholder ~ 280–360 chars to describe decisions and tradeoffs.",
      },
      { id: "diagram", title: "Diagram", type: "image", aspect: "3:2" },
      {
        id: "outcome",
        title: "Outcome",
        type: "paragraph",
        content: "One-sentence impact placeholder ~ 90–120 chars.",
      },
      {
        id: "next",
        title: "What I’d Do Next",
        type: "list",
        items: [
          "Next step 60–80 chars",
          "Next step 60–80 chars",
          "Next step 60–80 chars",
        ],
      },
    ],
  },
  {
    slug: "project-b",
    title: "Project B",
    impactLine:
      "Outcome placeholder: metrics ~ 60–80 chars, consistent height for layout fidelity.",
    tags: ["AI/ML", "Python"],
    timeframe: "2023",
    role: "Software & AI Engineer",
    metrics: ["Metric A", "Metric B"],
    sections: [
      {
        id: "context",
        title: "Context",
        type: "paragraph",
        content:
          "Paragraph placeholder ~ 220–280 chars for realistic reading width across breakpoints.",
      },
      {
        id: "problem",
        title: "Problem",
        type: "list",
        items: [
          "Bullet placeholder 60–80 chars",
          "Bullet placeholder 60–80 chars",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        type: "paragraph",
        content:
          "Paragraph placeholder ~ 280–360 chars to describe decisions and tradeoffs.",
      },
      { id: "diagram", title: "Diagram", type: "image", aspect: "3:2" },
      {
        id: "outcome",
        title: "Outcome",
        type: "paragraph",
        content: "One-sentence impact placeholder ~ 90–120 chars.",
      },
    ],
  },
];
