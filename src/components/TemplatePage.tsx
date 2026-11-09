import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { templates } from "../data/templates";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import TemplateGrid from "./TemplateGrid";
import TemplateModal from "./TemplateModal";
import type { Template } from "../types";

export default function TemplatePage({
  onSelectTemplate,
}: {
  onSelectTemplate: (template: Template) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "Klassik" | "Premium" | "Zamonaviy"
  >("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    string | undefined
  >(undefined);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = [
        template.title,
        template.category,
        template.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" || template.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchQuery]);

  const displayedTemplates = useMemo(() => {
    return showAll ? filteredTemplates : filteredTemplates.slice(0, 6);
  }, [filteredTemplates, showAll]);

  const handleSelect = (template: Template) => {
    setSelectedTemplateId(template.id);
    onSelectTemplate(template);
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <section
      id="shablonlar"
      className="border-b border-gold/10 bg-warm-bg/40 dark:bg-editorial-dark py-20 transition-colors duration-300 sm:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Lenta shablonlari
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-editorial-dark dark:text-gray-100 transition-colors duration-300 sm:text-4xl">
            Lenta shablonini tanlang
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400 transition-colors duration-300">
            O‘zingizga yoqqan shablonni tanlang va keyingi bosqichda ism, maktab
            va boshqa ma‘lumotlarni kiriting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="flex flex-col gap-5 rounded-3xl border border-gold/10 bg-white dark:bg-white/5 p-5 shadow-sm shadow-gold/10 transition-colors duration-300 sm:p-6"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Shablon qidirish..."
          />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredTemplates.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-8"
            >
              <TemplateGrid
                templates={displayedTemplates}
                selectedTemplateId={selectedTemplateId}
                onPreview={handlePreview}
                onSelect={handleSelect}
              />

              {filteredTemplates.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-8 py-3.5 rounded-full border border-gold/30 bg-white dark:bg-white/5 hover:border-gold hover:bg-gold/10 text-editorial-dark dark:text-gray-100 font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group"
                >
                  <span>
                    {showAll
                      ? "Kamroq ko'rsatish"
                      : `Barcha shablonlarni ko'rish (${filteredTemplates.length} ta)`}
                  </span>
                  <span className="text-gold group-hover:translate-y-0.5 transition-transform duration-200">
                    {showAll ? "↑" : "↓"}
                  </span>
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-dashed border-gold/20 bg-white dark:bg-white/5 p-12 text-center shadow-sm transition-colors duration-300"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warm-bg dark:bg-white/10 text-3xl">
                🔎
              </div>
              <h3 className="mt-5 text-xl font-semibold text-editorial-dark dark:text-gray-100">
                No templates found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                Ushbu so‘rov bo‘yicha hech qanday shablon topilmadi. Qidiruv
                so‘zini o‘zgartirib ko‘ring.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TemplateModal
        template={previewTemplate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />
    </section>
  );
}
