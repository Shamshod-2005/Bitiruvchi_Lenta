import type { Template } from "../types";
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
  selectedTemplateId?: string;
  onPreview: (template: Template) => void;
  onSelect: (template: Template) => void;
}

export default function TemplateGrid({
  templates,
  selectedTemplateId,
  onPreview,
  onSelect,
}: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplateId === template.id}
          onPreview={onPreview}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
