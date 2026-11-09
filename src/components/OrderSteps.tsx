import { motion } from "motion/react";
import { Sparkles, Palette, Send, Truck, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OrderStepsProps {
  onOpenOrderModal: () => void;
}

export default function OrderSteps({ onOpenOrderModal }: OrderStepsProps) {
  const { t } = useTranslation();

  const steps = [
    {
      id: "step-1",
      number: "01",
      icon: <Palette className="w-7 h-7 text-gold" />,
      title: t("orderSteps.step1.title"),
      description: t("orderSteps.step1.desc"),
      highlight: "14+ dizayn",
    },
    {
      id: "step-2",
      number: "02",
      icon: <Send className="w-7 h-7 text-gold" />,
      title: t("orderSteps.step2.title"),
      description: t("orderSteps.step2.desc"),
      highlight: "Telegram orqali",
    },
    {
      id: "step-3",
      number: "03",
      icon: <Truck className="w-7 h-7 text-gold" />,
      title: t("orderSteps.step3.title"),
      description: t("orderSteps.step3.desc"),
      highlight: "1-2 kun ichida",
    },
  ];

  return (
    <section
      id="how-to-order"
      className="py-12 sm:py-20 bg-warm-bg/40 dark:bg-editorial-dark border-b border-gold/10 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background soft glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t("orderSteps.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
            {t("orderSteps.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base transition-colors duration-300">
            {t("orderSteps.description")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-gold/15 hover:border-gold/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Step Number Watermark */}
              <div className="absolute top-4 right-6 text-4xl sm:text-5xl font-black text-gold/10 group-hover:text-gold/20 transition-colors pointer-events-none select-none font-serif">
                {step.number}
              </div>

              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Highlight Tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-gold px-2.5 py-1 rounded-full bg-gold/10 mb-3">
                  {step.highlight}
                </span>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold text-editorial-dark dark:text-gray-100 mb-2.5 transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Step indicator dot at bottom */}
              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between text-xs text-gold font-semibold">
                <span>{index + 1}-qadam</span>
                <span className="w-2 h-2 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold hover:bg-gold-hover text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-gold/25 hover:shadow-2xl hover:shadow-gold/35 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>{t("orderSteps.cta")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
