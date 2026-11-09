import { motion } from "motion/react";
import { Star, Quote, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { reviews } from "../data/reviews";

export default function Reviews() {
  const { t } = useTranslation();
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
    ));
  };

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-editorial-dark border-b border-gold/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest">
            {t("reviews.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
            {t("reviews.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base transition-colors duration-300">
            {t("reviews.description")}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative p-8 bg-warm-bg/25 dark:bg-white/5 border border-gold/10 hover:border-gold/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              id={`review-card-${review.id}`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-gold/10 pointer-events-none">
                <Quote className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">{renderStars(review.rating)}</div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light italic transition-colors duration-300">
                  "{review.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="mt-8 pt-5 border-t border-gold/5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-editorial-dark dark:text-gray-100 text-sm transition-colors duration-300">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-gold uppercase tracking-wider font-semibold mt-0.5">
                    {review.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />{" "}
                  100%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust summary box */}
        <div className="mt-16 bg-editorial-dark rounded-4xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden text-white border border-gold/10">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
            <div className="text-4xl">🌟</div>
            <div>
              <h3 className="text-white text-xl font-bold">
                {t("reviews.summaryTitle")}
              </h3>
              <p className="text-xs text-gray-400 font-light mt-1">
                {t("reviews.summaryDescription")}
              </p>
            </div>
          </div>
          <a
            href="#mahsulotlar"
            className="px-6 py-3 rounded-full bg-gold hover:bg-gold-hover text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-gold/20 shrink-0 relative z-10"
          >
            {t("reviews.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
