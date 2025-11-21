"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork, MdSchool } from "react-icons/md";
import { experience, ElementType } from "@/content/timeline/timeline";

export default function Timeline() {
  return (
    <VerticalTimeline lineColor="var(--line)">
      {experience.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          date={item.duration}
          icon={item.type === ElementType.Work ? <MdWork /> : <MdSchool />}
          position={item.type === ElementType.Work ? "right" : "left"}
          visible={true}
          contentStyle={{
            background: "var(--bg)",
            color: "var(--muted)",
            border: "2px solid var(--accent-500)",
            boxShadow: "none",
          }}
          contentArrowStyle={{
            borderRight: "10px solid var(--accent-500)",
          }}
          iconStyle={{
            background: "var(--bg)",
            color: "var(--on-accent)",
            border: "2px solid var(--accent-500)",
            boxShadow: "none",
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
