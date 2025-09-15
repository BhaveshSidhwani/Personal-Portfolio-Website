"use client";
import React from "react";
import Chip from "@/components/Chip";
import { Project } from "@/content/projects/projects";
import CardModal from "./CardModal";

type Props = {
  project: Project;
  children?: React.ReactNode;
};

export default function Card({ project, children }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <>
      <article
        className="flex flex-col rounded-lg border border-[--border] bg-[--panel] p-5 shadow-z1 hover-elevate cursor-pointer transition-all duration-200 hover:shadow-lg focus:ring"
        onClick={openModal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        aria-describedby={project.slug}
      >
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p id={project.slug} className="mt-1 text-sm text-[--muted]">
            {project.impactLine}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags && project.tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>
        {children}
      </article>

      <CardModal isOpen={isModalOpen} onClose={closeModal} project={project} />
    </>
  );
}
