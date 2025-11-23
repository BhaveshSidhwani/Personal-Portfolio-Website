"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork, MdSchool } from "react-icons/md";
import {
  experience,
  ElementType,
  Experience,
} from "@/content/timeline/timeline";
import TimelineCardModal from "./TimelineCardModal";

export default function Timeline() {
  const [selectedExperience, setSelectedExperience] =
    React.useState<Experience | null>(null);

  const openModal = (item: Experience) => setSelectedExperience(item);
  const closeModal = () => setSelectedExperience(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: Experience
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(item);
    }
  };

  return (
    <>
      <VerticalTimeline lineColor="var(--line)">
        {experience.map((item, index) => {
          const isWork = item.type === ElementType.Work;
          const title = isWork ? item.position : item.degree;

          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={item.duration}
              icon={isWork ? <MdWork /> : <MdSchool />}
              position={isWork ? "right" : "left"}
              visible={true}
              contentStyle={{
                background: "var(--bg)",
                color: "var(--muted)",
                border: "2px solid var(--accent-500)",
                boxShadow: "none",
                borderRadius: "8px",
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
              onTimelineElementClick={() => openModal(item)}
              textClassName="!p-0"
            >
              <div
                className="p-5 md:p-6 rounded-md cursor-pointer transition-colors duration-150 hover:bg-[--panel] focus:bg-[--panel] focus:outline-8 focus-visible:ring-2 focus-visible:ring-white"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${title} at ${item.institution}`}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(item);
                }}
                onKeyDown={(e) => handleKeyDown(e, item)}
              >
                <h3 className="vertical-timeline-element-title text-white text-lg font-semibold">
                  {title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle text-gray-200">
                  {item.institution}
                </h4>
                {isWork && item.project && (
                  <p className="mt-2 text-sm text-[--muted]">{item.project}</p>
                )}
                {!isWork && item.major && (
                  <p className="mt-2 text-sm text-[--muted]">{item.major}</p>
                )}
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>

      <TimelineCardModal
        isOpen={Boolean(selectedExperience)}
        onClose={closeModal}
        experience={selectedExperience}
      />
    </>
  );
}
