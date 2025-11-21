import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";

export default function AboutPage() {
  const skills = {
    Languages: [
      "Go",
      "Python",
      "Java",
      "C/C++",
      "JavaScript",
      "TypeScript",
      "SQL",
      "PHP",
      "HTML/CSS",
    ],
    "Frameworks & Libraries": [
      "Node",
      "Express",
      "Next",
      "React",
      "Spring Boot",
      "Keras",
      "PyTorch",
      "TensorFlow",
      "Flask",
      "Django",
    ],
    "Data & AI": [
      "RAG",
      "LLM",
      "OpenAI",
      "AzureAI",
      "Llama",
      "Gemini",
      "Vector database",
      "GraphDB",
    ],
    "DevOps & Cloud": [
      "Docker",
      "Git",
      "AWS",
      "GCP",
      "Azure",
      "Firebase",
      "Kubernetes",
    ],
    Databases: ["MySQL", "PostgreSQL", "MongoDB"],
  };

  return (
    <div className="space-y-6">
      <Timeline />

      <SectionHeader title="Skills" />
      <ul className="text-[--muted]">
        {Object.entries(skills).map(([category, items], i) => (
          <li key={i} className="py-1">
            <strong>{category}:</strong> {items.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
