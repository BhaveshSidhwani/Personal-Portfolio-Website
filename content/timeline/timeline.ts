enum ElementType {
  Work,
  Education,
}

type BaseExperience = {
  type: ElementType;
  institution: string;
  duration: string;
};

type WorkExperience = BaseExperience & {
  type: ElementType.Work;
  position: string;
  project: string;
  technologies: string[];
  description: string[];
};

type EducationExperience = BaseExperience & {
  type: ElementType.Education;
  degree: string;
  major: string;
  courseWork?: string[];
  gpa: string;
};

type TimelineEntry = WorkExperience | EducationExperience;

const experience: TimelineEntry[] = [
  {
    type: ElementType.Work,
    position: "Software Engineer",
    project: "Recruitment Platform",
    institution: "CareerUS Solutions",
    duration: "Jul 2025 - Present",
    technologies: ["Python", "LangChain", "TypeScript", "Node", "React", "MCP"],
    description: [
      "Built conversational AI agent with Next.js frontend, Express backend, and Python AI services deployed on AWS.",
      "Architected LangChain agent with RAG and MCP integrations, automating 40% of recruiter-candidate workflows.",
      "Engineered Redis semantic caching for queries and job data, cutting LLM calls by 30% and retrieval time by 65%.",
      "Achieved 85% code coverage by developing comprehensive test suite with Jest and Pytest.",
    ],
  },
  {
    type: ElementType.Work,
    position: "Software Engineer",
    project: "Cloud Observability and Insights",
    institution: "Cielara AI",
    duration: "Oct 2024 - Jun 2025",
    technologies: [
      "Go",
      "Python",
      "LangGraph",
      "TypeScript",
      "React",
      "MongoDB",
      "GCP",
      "Docker",
    ],
    description: [
      "Built AI-native cloud reliability platform with Next.js frontend, Go backend, and Python AI microservices on GCP.",
      "Developed multi-cloud infra scanner in Go to construct digital twin graphs with 50K+ nodes persisted on FalkorDB.",
      "Architected modular agent framework, reducing new agent development time from 2 weeks to 4 days.",
      "Implemented REST APIs for infra operations and WebSocket APIs for agent interactions with sub-200ms latency.",
      "Designed MongoDB session management with hierarchical summarization, enabling 35% longer conversations.",
      "Reduced RAG token usage by 75% through MilvusDB vector store with targeted sub-graph retrieval.",
    ],
  },
  {
    type: ElementType.Work,
    position: "Full Stack Developer",
    project: "Volunteer Help Platform",
    institution: "Saayam for All",
    duration: "Jun 2024 - Oct 2024",
    technologies: [
      "JavaScript",
      "React",
      "Redux",
      "Java",
      "Spring Boot",
      "AWS",
    ],
    description: [
      "Developed real-time request dashboard using React and Redux, reducing volunteer response time by 45%.",
      "Built REST APIs using Spring Boot to handle real-time notifications, enabling instant request alerts to volunteers.",
      "Integrated AWS Cognito with MFA, reducing onboarding time by 30% and increasing signup completion by 20%.",
    ],
  },
  {
    type: ElementType.Education,
    degree: "Master of Science",
    major: "Computer Science",
    institution: "Rutgers University",
    duration: "2024",
    gpa: "3.88",
    courseWork: [
      "DSA",
      "OS Design",
      "DB Design",
      "DBMS",
      "Software Engineering",
      "AI",
      "ML",
    ],
  },
  {
    type: ElementType.Work,
    position: "Software Developer Intern",
    project: "Inventory Management System",
    institution: "MAD Engineers",
    duration: "Nov 2021 - May 2022",
    technologies: ["Java", "Android", "OAuth2", "Firebase", "MySQL"],
    description: [
      "Built Android app for inventory management, cutting stockouts by 30% through automated tracking and alerts.",
      "Implemented real-time monitoring with Firebase, enabling field staff to manage inventory with role-based access.",
      "Migrated 10K+ records from Google Drive to MySQL via automated ETL pipeline with OAuth2 authentication.",
      "Enhanced UX through lazy loading and pagination, reducing load time by 70% for low-connectivity users.",
    ],
  },
  {
    type: ElementType.Education,
    degree: "Bachelor of Engineering",
    major: "Computer Engineering",
    institution: "University of Mumbai",
    duration: "2022",
    gpa: "3.75",
  },
];

export { experience, ElementType };
export type {
  WorkExperience,
  EducationExperience,
  TimelineEntry as Experience,
};
