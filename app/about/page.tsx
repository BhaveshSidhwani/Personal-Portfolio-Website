import SectionHeader from "@/components/SectionHeader";

export default function AboutPage() {
  const workExperience = [
    {
      position: "Software Engineer",
      company: "Cielara AI",
      start: "Oct 2024",
      end: "Jun 2025",
    },
    {
      position: "Full Stack Developer",
      company: "Saayam for All",
      start: "Jun 2024",
      end: "Oct 2024",
    },
    {
      position: "Software Engineer",
      company: "MAD Engineers",
      start: "Nov 2021",
      end: "May 2022",
    },
  ];

  const education = [
    {
      degree: "Master of Science",
      major: "Computer Science",
      institution: "Rutgers University",
      gpa: "3.88",
      year: "2024",
    },
    {
      degree: "Bachelor of Engineering",
      major: "Computer Engineering",
      institution: "University of Mumbai",
      gpa: "3.7",
      year: "2022",
    },
  ];

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
      <SectionHeader title="Work Experience" />
      <ul className="text-[--muted]">
        {workExperience.map((exp, i) => (
          <li key={i} className="py-1">
            <span>
              <strong>{exp.position}</strong>, {exp.company} •{" "}
              <em>
                {exp.start} – {exp.end}
              </em>
            </span>
          </li>
        ))}
      </ul>

      <SectionHeader title="Education" />
      <ul className="text-[--muted]">
        {education.map((exp, i) => (
          <li key={i} className="py-1">
            <span>
              <strong>
                {exp.degree} in {exp.major}
              </strong>
              , {exp.institution} • <em>{exp.year}</em>
            </span>
          </li>
        ))}
      </ul>

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
