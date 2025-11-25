import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Chip from "./Chip";
import { ElementType, Experience } from "@/content/timeline/timeline";

type TimelineCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience | null;
};

export default function TimelineCardModal({
  isOpen,
  onClose,
  experience,
}: TimelineCardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedElementRef.current = document.activeElement as HTMLElement;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);

      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !experience) return null;

  const isWork = experience.type === ElementType.Work;
  const typeLabel = isWork ? "Work Experience" : "Education";
  const title = isWork ? experience.position : experience.degree;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-modal-title"
      aria-describedby="timeline-modal-description"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[--panel] rounded-xl border border-[--border] shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex-1 pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--muted]">
              {typeLabel}
            </p>
            <h2
              id="timeline-modal-title"
              className="text-2xl font-bold text-[--text]"
            >
              {title}
            </h2>
            <p className="mt-1 text-[--muted]">{experience.institution}</p>
            <p className="mt-2 text-sm text-[--muted]">{experience.duration}</p>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-2 text-[--muted] hover:text-[--text] hover:bg-[--bg] transition-colors focus:ring"
            aria-label="Close modal"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {isWork && experience.project && (
              <Chip variant="outline">{experience.project}</Chip>
            )}
            {!isWork && experience.major && (
              <Chip variant="outline">{experience.major}</Chip>
            )}
          </div>

          <div className="pt-8 flex flex-wrap gap-2">
            {isWork &&
              experience.technologies &&
              experience.technologies.map((tech) => (
                <Chip key={tech} variant="neutral_outline">
                  {tech}
                </Chip>
              ))}
            {!isWork &&
              experience.courseWork &&
              experience.courseWork.map((course) => (
                <Chip key={course}>{course}</Chip>
              ))}
          </div>

          <div
            id="timeline-modal-description"
            className="pt-10 prose prose-sm max-w-none text-[--text]"
          >
            <ul className="list-disc mb-6 pl-6 pr-4 leading-relaxed">
              {isWork &&
                experience.description &&
                experience.description.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              {!isWork && experience.gpa && <li>GPA: {experience.gpa}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
