"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork, MdSchool } from "react-icons/md";

enum ElementType {
  Work,
  Education,
}

export default function Timeline() {
  const experience = [
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
      project: "Accessible Help Platform",
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

  return (
    <VerticalTimeline lineColor="var(--line)">
      {experience.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          date={item.duration}
          icon={item.type === ElementType.Work ? <MdWork /> : <MdSchool />}
          position={item.type === ElementType.Work ? "left" : "right"}
          visible={true}
          contentStyle={{
            background: "var(--accent-500)",
            color: "var(--muted)",
          }}
          contentArrowStyle={{
            borderRight: "7px solid var(--accent-500)",
          }}
          iconStyle={{
            background: "var(--accent-500)",
            color: "var(--on-accent)",
          }}
        >
          <h3 className="vertical-timeline-element-title text-white">
            <b>{item.position || item.degree}</b>
          </h3>
          <h4 className="vertical-timeline-element-subtitle text-gray-200">
            {item.institution}
          </h4>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
