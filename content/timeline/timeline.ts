enum ElementType {
  Work,
  Education,
}

type Experience = {
  type: ElementType;
  institution: string;
  duration: string;

  position?: string;
  project?: string;

  degree?: string;
  abbreviation?: string;
  major?: string;
};

const experience: Experience[] = [
  {
    type: ElementType.Work,
    position: "Software Engineer",
    project: "Recruitment Platform",
    institution: "CareerUS Solutions",
    duration: "Jul 2025 - Present",
  },
  {
    type: ElementType.Work,
    position: "Software Engineer",
    project: "Cloud Observability and Insights",
    institution: "Cielara AI",
    duration: "Oct 2024 - Jun 2025",
  },
  {
    type: ElementType.Work,
    position: "Full Stack Developer",
    project: "Volunteer Help Platform",
    institution: "Saayam for All",
    duration: "Jun 2024 - Oct 2024",
  },
  {
    type: ElementType.Education,
    degree: "Master of Science",
    abbreviation: "M.S.",
    major: "Computer Science",
    institution: "Rutgers University",
    duration: "2024",
  },
  {
    type: ElementType.Work,
    position: "Software Developer Intern",
    project: "Inventory Management System",
    institution: "MAD Engineers",
    duration: "Nov 2021 - May 2022",
  },
  {
    type: ElementType.Education,
    degree: "Bachelor of Engineering",
    abbreviation: "B.E.",
    major: "Computer Engineering",
    institution: "University of Mumbai",
    duration: "2022",
  },
];

export { experience, ElementType };
export type { Experience };
