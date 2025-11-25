import Chip from "@/components/Chip";
import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";
import { skills } from "@/content/skills/skills";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Timeline />

      <SectionHeader title="Skills" />
      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.title} className="space-y-3">
            <h3 className="text-sm font-semibold text-[--foreground] uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, index) => (
                <Chip
                  key={index}
                  className="transition-transform hover:scale-105"
                >
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-[1.5em] w-[1.5em]"
                    />
                  )}
                  <span className="ml-2">{item.label}</span>
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
