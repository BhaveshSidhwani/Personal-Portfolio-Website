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
    slug: "cloud-observability-and-insights",
    title: "Cloud Observability and Insights",
    impactLine:
      "Go-based infrastructure monitoring and insights platform with AI-driven management.",
    tags: [
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
    ],
    timeframe: "Oct 2024 - Jun 2025",
    role: "Software Engineer",
    metrics: [],
    sections: [
      {
        id: "description",
        title: "Description",
        type: "list",
        items: [
          "Built a RAG pipeline powering 7 AI agents to facilitate infrastructure security, management, and compliance.",
          "Developed infra-scanner Go service, transforming observability data into a knowledge graph persisted on GraphDB.",
          "Integrated a vector database for dynamic Cypher query generation for precise sub-graph context retrieval, reducing token usage by 75%.",
          "Designed a continuous evaluation pipeline for RAG agents using RAGAS to prevent model drift and ensure long-term relevance.",
          "Engineered a critique feedback agent in a dual-LLM setting, boosting relevancy evaluation score by 15%.",
        ],
      },
    ],
  },
  {
    slug: "asl-recognition",
    title: "ASL Recognition",
    impactLine:
      "Real-time American Sign Language recognition using CNN and transfer learning.",
    tags: ["Python", "TensorFlow", "Keras", "PyTorch", "CV2"],
    timeframe: "May 2024",
    role: "Software Engineer",
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
];
