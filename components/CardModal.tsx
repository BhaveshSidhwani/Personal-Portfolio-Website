import { Project } from "@/content/projects/projects";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Chip from "./Chip";
import Link from "next/link";
import { Route } from "next";
import Button from "./Button";

type CardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  children?: React.ReactNode; // For Read More button or other content
};

export default function CardModal({
  isOpen,
  onClose,
  project,
  children,
}: CardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Handle ESC key and focus management
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

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab (going backwards)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab (going forwards)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Prevent body scroll
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

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[--panel] rounded-xl border border-[--border] shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex-1 pr-4">
            <h2 id="modal-title" className="text-2xl font-bold text-[--text]">
              {project.title}
            </h2>
            <p className="mt-2 text-[--muted]">{project.impactLine}</p>
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

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Tags */}
          <div className="my-3 flex flex-wrap gap-2">
            {project.tags && project.tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>

          {/* Description */}
          <div id="modal-description" className="prose prose-sm max-w-none">
            <ul className="list-disc mb-6 pl-6 pr-4 text-[--text] leading-relaxed whitespace-pre-wrap">
              {project.sections &&
                project.sections[0].items &&
                project.sections[0].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>

          {project.url && (
            <Link
              href={project.url as Route}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="secondary">Source code</Button>
            </Link>
          )}

          {/* Additional content (like Read More button) */}
          {children && (
            <div className="mt-6 pt-4 border-t border-[--border]">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
