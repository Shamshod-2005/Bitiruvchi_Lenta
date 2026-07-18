import { CheckCircle2, Eye, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onPreview: (template: Template) => void;
  onSelect: (template: Template) => void;
}

export default function TemplateCard({
  template,
  isSelected,
  onPreview,
  onSelect,
}: TemplateCardProps) {
  const templateNumber = `#${String(template.id).padStart(2, "0")}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border bg-white shadow-md transition-all duration-300 ${
        isSelected
          ? "border-gold shadow-lg shadow-gold/20 ring-2 ring-gold/10"
          : "border-gold/10 hover:border-gold hover:shadow-xl"
      }`}
    >
      <div className="relative aspect-[5/1] overflow-hidden bg-warm-bg/40">
        <img
          src={template.image}
          alt={template.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
            {templateNumber}
          </span>
          {template.popular && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> TOP
            </span>
          )}
        </div>

        {isSelected && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold text-white">
            <CheckCircle2 className="h-3.5 w-3.5" /> Tanlandi
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-editorial-dark/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-semibold text-editorial-dark shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            aria-label={`Shablonni ko'rish: ${template.title}`}
          >
            <Eye className="h-4 w-4" /> Ko‘rish
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-editorial-dark">
              {template.title}
            </h3>
            <span className="rounded-full bg-warm-bg px-3 py-1 text-[11px] font-medium text-gold">
              {template.category}
            </span>
          </div>
          <p className="text-sm leading-6 text-gray-500">
            {template.description}
          </p>
        </div>

        <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="flex-1 rounded-full border border-gold/15 px-4 py-2.5 text-sm font-semibold text-editorial-dark transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Ko‘rish
          </button>
          <button
            type="button"
            onClick={() => onSelect(template)}
            className="flex-1 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gold-hover"
          >
            Tanlash
          </button>
        </div>
      </div>
    </motion.article>
  );
}
