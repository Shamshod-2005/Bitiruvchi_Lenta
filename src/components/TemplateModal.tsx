import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Template } from "../types";

interface TemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export default function TemplateModal({
  template,
  isOpen,
  onClose,
  onSelect,
}: TemplateModalProps) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
    }
  }, [isOpen]);

  if (!template) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-editorial-dark/70 px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            transition={{ duration: 0.24 }}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-4xl border border-gold/10 bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-modal-title"
          >
            <div className="flex items-start justify-between border-b border-gold/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                  Preview
                </p>
                <h3
                  id="template-modal-title"
                  className="mt-1 text-xl font-semibold text-editorial-dark"
                >
                  {template.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gold/10 p-2 text-gray-500 transition-colors hover:border-gold hover:text-gold"
                aria-label="Yopish"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-warm-bg/40 p-5 sm:p-8">
              <div className="overflow-hidden rounded-3xl border border-gold/10 bg-white p-4 shadow-inner">
                <div className="flex items-center justify-end gap-2 pb-4">
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((value) =>
                        Math.max(1, Number((value - 0.25).toFixed(2))),
                      )
                    }
                    className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                    aria-label="Kichraytirish"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-semibold text-editorial-dark">
                    {zoom.toFixed(2)}x
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((value) =>
                        Math.min(2, Number((value + 0.25).toFixed(2))),
                      )
                    }
                    className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                    aria-label="Kattalashtirish"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex min-h-80 items-center justify-center overflow-auto bg-warm-bg/50 p-2 sm:p-4">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="max-h-[60vh] w-full max-w-full rounded-2xl object-contain transition-transform duration-300"
                    style={{ transform: `scale(${zoom})` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gold/10 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gold-hover"
              >
                Tanlash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
