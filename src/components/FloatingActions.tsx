import { motion, AnimatePresence } from "motion/react";
import { Phone, Send, Instagram, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions = [
    {
      id: "tg-float",
      icon: <Send className="w-5 h-5" />,
      color: "bg-sky-500 hover:bg-sky-600",
      label: "Telegram",
      url: "https://t.me/Angrenlenti",
    },
    {
      id: "insta-float",
      icon: <Instagram className="w-5 h-5" />,
      color: "bg-pink-600 hover:bg-pink-700",
      label: "Instagram",
      url: "https://instagram.com/angren.lenti",
    },
    {
      id: "phone-float",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-emerald-500 hover:bg-emerald-600",
      label: "Telefon",
      url: "tel:+998940115244",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      id="floating-action-buttons"
    >
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-white text-gold shadow-lg backdrop-blur transition-colors"
            aria-label="Yuqoriga chiqish"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2 rounded-[1.5rem] border border-white/40 bg-white/80 p-2 shadow-xl backdrop-blur">
        {actions.map((action, index) => (
          <motion.a
            key={action.id}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-colors ${action.color}`}
            title={action.label}
            aria-label={action.label}
            id={action.id}
          >
            {action.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
