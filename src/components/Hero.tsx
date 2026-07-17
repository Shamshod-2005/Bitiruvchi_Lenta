import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Truck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "../../assets/img3.jpg";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  const { t } = useTranslation();
  const stats = [
    {
      id: "stat-1",
      icon: <Users className="w-5 h-5 text-gold" />,
      value: "5000+",
      label: t("hero.stats.customers"),
    },
    {
      id: "stat-2",
      icon: <Award className="w-5 h-5 text-gold" />,
      value: "100+",
      label: t("hero.stats.institutions"),
    },
    {
      id: "stat-3",
      icon: <Truck className="w-5 h-5 text-gold" />,
      value: "14 ta",
      label: t("hero.stats.regions"),
    },
    {
      id: "stat-4",
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      value: "3 yil+",
      label: t("hero.stats.warranty"),
    },
  ];

  const handleScrollToProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#mahsulotlar");
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="bosh-sahifa"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-warm-bg"
    >
      {/* Decorative background watermarks & glows */}
      <div className="absolute top-10 left-12 opacity-[0.03] font-serif text-[180px] lg:text-[280px] select-none leading-none -z-0 pointer-events-none">
        2026
      </div>
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-64 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
                ✨ {t("hero.badge")}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-editorial-dark leading-[1.12] tracking-tight">
                {t("hero.title").split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-gold">
                  {t("hero.title").split(" ").slice(2, 4).join(" ")}
                </span>{" "}
                <br />
                {t("hero.title").split(" ").slice(4).join(" ")}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-editorial-dark hover:bg-gold text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-editorial-dark/10 transition-all focus:outline-none hover:-translate-y-0.5"
              >
                {t("hero.ctaPrimary")}
              </button>
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border-2 border-gold/30 text-gold hover:bg-gold hover:text-white font-bold text-sm tracking-wider uppercase transition-all focus:outline-none hover:-translate-y-0.5"
              >
                {t("hero.ctaSecondary")}
              </button>
            </motion.div>

            {/* Stats Indicators Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gold/20"
            >
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="text-center lg:text-left p-3 rounded-xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="flex justify-center lg:justify-start mb-1.5">
                    {stat.icon}
                  </div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-editorial-dark">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Premium Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/10 bg-white group"
              id="hero-image-showcase"
            >
              <img
                src={heroImage}
                alt="Premium bitiruvchi lentasi va qalpoq"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              {/* Elegant blur-in overlay card */}
              <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-gold text-[10px] uppercase tracking-widest font-bold">
                  Premium Sifat
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-serif font-bold mt-1">
                  Oltin Yozuvli Atlas Lentalar
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-2 font-light leading-relaxed">
                  Har bir buyurtmaga individual yondashilgan holda, sifatli
                  yaltiroq va bardoshli matnlardan tayyorlanadi.
                </p>
              </div>

              {/* Floating accent badge */}
              <div className="absolute top-4 right-4 bg-gold text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                👑 BESTSELLER
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
