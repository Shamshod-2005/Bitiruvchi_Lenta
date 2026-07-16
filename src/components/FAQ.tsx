import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <section id="faq" className="py-24 bg-warm-bg/40 border-b border-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest">
            {t("faq.eyebrow")}
          </span>
          <h2 className="text-3xl font-bold font-serif text-editorial-dark mt-2">
            {t("faq.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-500 mt-4 leading-relaxed font-light text-sm">
            {t("faq.description")}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4" id="faq-accordion-group">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-gold shadow-lg shadow-gold/5"
                    : "border-gold/10 shadow-sm"
                }`}
                id={faq.id}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-editorial-dark focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base leading-tight font-serif font-bold">
                    <HelpCircle
                      className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-gold" : "text-gray-400"}`}
                    />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gold" : ""
                    }`}
                  />
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gold/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
