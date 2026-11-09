import { motion } from "motion/react";
import { Shield, Sparkles, Tag, Zap, Palette, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const advantages = [
    {
      id: "adv-1",
      icon: <Shield className="w-5 h-5 text-gold" />,
      title: t("about.advantages.quality.title"),
      desc: t("about.advantages.quality.description"),
    },
    {
      id: "adv-2",
      icon: <Tag className="w-5 h-5 text-gold" />,
      title: t("about.advantages.price.title"),
      desc: t("about.advantages.price.description"),
    },
    {
      id: "adv-3",
      icon: <Zap className="w-5 h-5 text-gold" />,
      title: t("about.advantages.delivery.title"),
      desc: t("about.advantages.delivery.description"),
    },
    {
      id: "adv-4",
      icon: <Palette className="w-5 h-5 text-gold" />,
      title: t("about.advantages.custom.title"),
      desc: t("about.advantages.custom.description"),
    },
    {
      id: "adv-5",
      icon: <MapPin className="w-5 h-5 text-gold" />,
      title: t("about.advantages.regions.title"),
      desc: t("about.advantages.regions.description"),
    },
  ];

  return (
    <section
      id="biz-haqimizda"
      className="py-24 bg-white dark:bg-editorial-dark border-b border-gold/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold font-bold text-xs uppercase tracking-widest">
              {t("about.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
              {t("about.title")}
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base transition-colors duration-300">
              {t("about.description")}
            </p>
          </motion.div>
        </div>

        {/* Grid Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-gold/10 bg-warm-bg/25 dark:bg-white/5 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              id={adv.id}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 border border-gold/10">
                  {adv.icon}
                </div>
                <h3 className="text-lg font-bold text-editorial-dark dark:text-gray-100 mb-2 transition-colors duration-300">
                  {adv.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors duration-300">
                  {adv.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gold/5 flex items-center text-gold text-[10px] font-bold uppercase tracking-widest gap-1.5">
                {t("about.guarantee")}{" "}
                <Sparkles className="w-3 h-3 text-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
