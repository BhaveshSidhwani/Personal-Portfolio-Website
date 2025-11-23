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
  url: `/${string}` | `https://${string}` | `http://${string}` | "";
  tags: string[];
  timeframe: string;
  role: string;
  metrics: string[];
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "localization-manager",
    title: "Localization Manager",
    impactLine:
      "Full-stack application that lets you manage translation keys, values, projects, and languages.",
    url: "https://github.com/BhaveshSidhwani/Localization-Manager",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Jest",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "PyTest",
    ],
    timeframe: "Jun 2025",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Developed a full-stack translation key manager to list, search, paginate, and inline edit translation keys.",
          "Implemented project and language sidebar selectors with an 'Add language' modal for easy navigation.",
          "Optimized user experience with optimistic updates using React Query and Supabase bulk upsert.",
          "Built a robust backend with CRUD operations, project filtering, locale endpoints, and bulk updates using FastAPI.",
          "Patched CORS to support GET, POST, and PATCH requests from the front-end development host.",
        ],
      },
    ],
  },
  {
    slug: "asl-recognition",
    title: "ASL Recognition",
    impactLine:
      "Real-time American Sign Language recognition using CNN and transfer learning.",
    url: "https://github.com/BhaveshSidhwani/ASL-recognition",
    tags: ["Python", "TensorFlow", "Keras", "PyTorch", "CV2"],
    timeframe: "May 2024",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Trained 4 CNN models with over 196,000 image dataset and classifying with over 95% accuracy.",
          "Streamlined ASL prediction by integrating CNN models with live video stream.",
        ],
      },
    ],
  },
  {
    slug: "operating-system-libraries",
    title: "Operating System Libraries",
    impactLine:
      "Operating system libraries including multi-threading, memory management and file system management in C.",
    url: "https://github.com/BhaveshSidhwani/Operating-System-Libraries",
    tags: [
      "C",
      "OS Design",
      "Multi-threading",
      "Memory Management",
      "File System",
      "FUSE",
    ],
    timeframe: "May 2023",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Integrated SJF, MLFQ schedulers with thread control, achieving 5% faster thread execution than pthread library.",
          "Referenced 4GB of memory by implementing 2-level page table of 16KB page size and optimized it using TLB.",
          "Leveraged FUSE framework to enhance I/O efficiency of disk operations by 10% for sequential operations.",
        ],
      },
    ],
  },
  {
    slug: "car-rental-website",
    title: "Car Rental Website",
    impactLine: "Web-based car rental platform.",
    url: "https://github.com/BhaveshSidhwani/Reyoca-Car-Rental",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL", "AWS"],
    timeframe: "Dec 2023",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Developed a RESTful API gateway for a user-friendly website on AWS EC2 with data stored in S3.",
          "Optimized SQL schema on RDS, reducing API response time by 15%.",
          "Enhanced user experience with Stripe payments, Google Maps API, and JWT authentication.",
        ],
      },
    ],
  },
  {
    slug: "placement-system",
    title: "Placement System",
    impactLine: "Mobile application for managing campus placements.",
    url: "https://github.com/BhaveshSidhwani/Placement-System",
    tags: [
      "Java",
      "Android",
      "Firebase",
      "Python",
      "ML",
      "Flask",
      "PHP",
      "MySQL",
    ],
    timeframe: "May 2022",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Developed an Android application to streamline campus placement processes.",
          "Integrated a resume scorer using Cosine Similarity to match resumes with job profiles.",
          "Implemented Random Forest algorithms to predict interview probabilities based on user tests.",
        ],
      },
    ],
  },
  {
    slug: "learning-management-system",
    title: "Learning Management System",
    impactLine:
      "Java-based application for managing coursework and assignments.",
    url: "https://github.com/BhaveshSidhwani/Learning-Management-System",
    tags: ["Java", "MySQL", "Swing"],
    timeframe: "May 2021",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "A cloud storage server to facilitate e - learning during covid.",
          "Developed multiple APIs to allow professors to submit coursework and assignments online and students to submit solution for grading.",
          "Implemented multi-threading on server side to improve latency.",
        ],
      },
    ],
  },
  {
    slug: "explore-cali",
    title: "Explore Cali",
    impactLine:
      "Spring Boot microservice tutorial project for Explore California.",
    url: "https://github.com/BhaveshSidhwani/Explore-Cali-Spring-Boot",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Gateway",
      "Docker",
      "MongoDB",
      "MySQL",
    ],
    timeframe: "Jul 2025",
    role: "",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Developed multiple microservices including tour and packages, images and gateway services with Spring Boot.",
          "Implemented API Gateway using Spring Cloud Gateway for routing and load balancing.",
          "Containerized microservices using Docker for consistent deployment across environments.",
        ],
      },
    ],
  },
];
