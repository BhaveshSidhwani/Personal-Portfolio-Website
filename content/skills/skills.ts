type Skill = {
  label: string;
  icon?: string;
};

type SkillCategory = {
  title: string;
  items: Skill[];
};

const skills: SkillCategory[] = [
  {
    title: "Languages",
    items: [
      { label: "Go", icon: "https://cdn.simpleicons.org/go" },
      {
        label: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        label: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      { label: "C/C++", icon: "https://cdn.simpleicons.org/cplusplus" },
      {
        label: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/EAA500",
      },
      { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { label: "SQL" },
      { label: "PHP", icon: "https://cdn.simpleicons.org/php" },
      { label: "HTML/CSS", icon: "https://cdn.simpleicons.org/html5" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { label: "Node", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { label: "Express", icon: "https://cdn.simpleicons.org/express" },
      { label: "Next", icon: "https://cdn.simpleicons.org/nextdotjs" },
      { label: "React", icon: "https://cdn.simpleicons.org/react" },
      { label: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot" },
      { label: "Keras", icon: "https://cdn.simpleicons.org/keras" },
      { label: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
      { label: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
      { label: "Flask", icon: "https://cdn.simpleicons.org/flask" },
      { label: "Django", icon: "https://cdn.simpleicons.org/django" },
    ],
  },
  {
    title: "Data & AI",
    items: [
      { label: "RAG" },
      { label: "LLM" },
      { label: "OpenAI", icon: "https://cdn.simpleicons.org/openai" },
      { label: "AzureAI" },
      { label: "Llama", icon: "https://cdn.simpleicons.org/ollama" },
      { label: "Gemini", icon: "https://cdn.simpleicons.org/googlegemini" },
      { label: "Vector database" },
      { label: "GraphDB" },
      { label: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
      { label: "LangGraph" },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { label: "Docker", icon: "https://cdn.simpleicons.org/docker" },
      { label: "Git", icon: "https://cdn.simpleicons.org/git" },
      {
        label: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        label: "GCP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
      {
        label: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
      { label: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
      { label: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
    ],
  },
  {
    title: "Databases",
    items: [
      {
        label: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
      },
      { label: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
      { label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { label: "Redis", icon: "https://cdn.simpleicons.org/redis" },
      { label: "Milvus", icon: "https://cdn.simpleicons.org/milvus" },
    ],
  },
];

export { skills };
