import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, Layers, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { galleryItems } from "../data/gallery";

const CATEGORIES = ["Barchasi", "Marosim", "Maktab", "Mahsulot", "Universitet"];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "Barchasi") return true;
    return (
      item.category === selectedCategory ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <section
      id="galereya"
      className="py-24 bg-warm-bg/20 border-b border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest">
            {t("gallery.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-editorial-dark mt-2">
            {t("gallery.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 mt-4 leading-relaxed font-light text-sm sm:text-base">
            {t("gallery.description")}
          </p>
        </div>

        {/* Gallery Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus:outline-none ${
                selectedCategory === category
                  ? "bg-gold text-white shadow-lg shadow-gold/20"
                  : "bg-white border border-gold/10 text-gray-600 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative aspect-video sm:aspect-square md:aspect-4/3 rounded-4xl overflow-hidden group shadow-md border border-gold/10 hover:border-gold/30 transition-all bg-warm-bg"
                id={`gallery-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/95 via-editorial-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="px-3 py-1 rounded-full bg-gold text-white text-[9px] font-bold uppercase tracking-widest self-start mb-2.5">
                    {item.category}
                  </span>
                  <h3 className="text-white text-lg font-serif font-bold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-1.5 font-light flex items-center gap-1">
                    {t("gallery.caption")}{" "}
                    <Sparkles className="w-3 h-3 text-gold" />
                  </p>
                </div>

                {/* Always-on badge for mobile accessibility */}
                <div className="absolute top-3 right-3 bg-editorial-dark/70 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold lg:hidden border border-white/10">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
