import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Home,
  Sparkles,
  GraduationCap,
  Image as ImageIcon,
  PhoneCall,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileBottomNavProps {
  onOpenOrderModal: () => void;
}

export default function MobileBottomNav({
  onOpenOrderModal,
}: MobileBottomNavProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("home");

  // Scroll orqali qaysi bo'limda turganini aniqlash (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = [
        { id: "bosh-sahifa", key: "home" },
        { id: "shablonlar", key: "templates" },
        { id: "galereya", key: "gallery" },
        { id: "kontakt", key: "contact" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop - 150;
          if (scrollY >= top) {
            setActiveTab(sections[i].key);
            return;
          }
        }
      }
      if (scrollY < 200) {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, key: string) => {
    setActiveTab(key);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="fixed bottom-2.5 inset-x-0 z-40 px-3 flex justify-center pointer-events-none md:hidden"
      id="mobile-bottom-navigation"
    >
      <div className="w-full max-w-sm pointer-events-auto bg-white/92 dark:bg-[#141414]/94 backdrop-blur-2xl border border-gold/25 dark:border-gold/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] rounded-full px-2 py-1 flex items-center justify-between transition-colors duration-300">
        {/* 1. Bosh sahifa */}
        <button
          type="button"
          onClick={() => scrollToSection("bosh-sahifa", "home")}
          className={`flex-1 flex flex-col items-center justify-center py-0.5 transition-colors relative cursor-pointer ${
            activeTab === "home"
              ? "text-gold font-bold scale-105"
              : "text-gray-500 dark:text-gray-400 hover:text-gold/80"
          }`}
          aria-label={t("bottomNav.home")}
        >
          <Home className="w-4.5 h-4.5 transition-transform active:scale-90" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
            {t("bottomNav.home")}
          </span>
        </button>

        {/* 2. Shablonlar */}
        <button
          type="button"
          onClick={() => scrollToSection("shablonlar", "templates")}
          className={`flex-1 flex flex-col items-center justify-center py-0.5 transition-colors relative cursor-pointer ${
            activeTab === "templates"
              ? "text-gold font-bold scale-105"
              : "text-gray-500 dark:text-gray-400 hover:text-gold/80"
          }`}
          aria-label={t("bottomNav.templates")}
        >
          <Sparkles className="w-4.5 h-4.5 transition-transform active:scale-90" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
            {t("bottomNav.templates")}
          </span>
        </button>

        {/* 3. Markaziy ko'tarilgan ASOSIY BUYURTMA TUGMASI (Raised Center Button) */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-2">
          <motion.button
            type="button"
            onClick={onOpenOrderModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="w-12 h-12 rounded-full bg-linear-to-tr from-[#9c7816] via-[#D4AF37] to-[#F6E7A2] text-editorial-dark font-extrabold flex items-center justify-center shadow-[0_6px_20px_rgba(212,175,55,0.45)] ring-3 ring-white dark:ring-[#141414] transition-all cursor-pointer group"
            id="mobile-center-order-btn"
            aria-label={t("bottomNav.order")}
          >
            <GraduationCap className="w-6 h-6 text-editorial-dark group-hover:rotate-12 transition-transform duration-300 drop-shadow-xs" />
          </motion.button>
          <span className="text-[9.5px] font-bold text-gold mt-0.5 tracking-tight">
            {t("bottomNav.order")}
          </span>
        </div>

        {/* 4. Galereya */}
        <button
          type="button"
          onClick={() => scrollToSection("galereya", "gallery")}
          className={`flex-1 flex flex-col items-center justify-center py-0.5 transition-colors relative cursor-pointer ${
            activeTab === "gallery"
              ? "text-gold font-bold scale-105"
              : "text-gray-500 dark:text-gray-400 hover:text-gold/80"
          }`}
          aria-label={t("bottomNav.gallery")}
        >
          <ImageIcon className="w-4.5 h-4.5 transition-transform active:scale-90" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
            {t("bottomNav.gallery")}
          </span>
        </button>

        {/* 5. Aloqa */}
        <button
          type="button"
          onClick={() => scrollToSection("kontakt", "contact")}
          className={`flex-1 flex flex-col items-center justify-center py-0.5 transition-colors relative cursor-pointer ${
            activeTab === "contact"
              ? "text-gold font-bold scale-105"
              : "text-gray-500 dark:text-gray-400 hover:text-gold/80"
          }`}
          aria-label={t("bottomNav.contact")}
        >
          <PhoneCall className="w-4.5 h-4.5 transition-transform active:scale-90" />
          <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
            {t("bottomNav.contact")}
          </span>
        </button>
      </div>
    </div>
  );
}
