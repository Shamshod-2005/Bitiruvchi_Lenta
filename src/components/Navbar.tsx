import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, GraduationCap, ChevronRight, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../hooks/useTheme";

interface NavbarProps {
  onOpenOrderModal: () => void;
}

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  className?: string;
}

function ThemeToggleButton({ theme, toggleTheme, className = "" }: ThemeToggleProps) {
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-gold/25 bg-white/70 dark:bg-white/5 hover:border-gold/50 text-editorial-dark dark:text-gray-100 transition-colors duration-200 focus:outline-none cursor-pointer shadow-xs ${className}`}
      aria-label={
        isDark ? t("navbar.themeToggleLight") : t("navbar.themeToggleDark")
      }
      title={
        isDark ? t("navbar.themeToggleLight") : t("navbar.themeToggleDark")
      }
      id="theme-toggle-btn"
    >
      <Sun
        className={`absolute w-4.5 h-4.5 text-gold transition-all duration-300 ${
          isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute w-4.5 h-4.5 text-gold transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />
    </button>
  );
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navbar.home"), href: "#bosh-sahifa" },
    { name: t("navbar.products"), href: "#mahsulotlar" },
    { name: t("navbar.about"), href: "#biz-haqimizda" },
    { name: t("navbar.gallery"), href: "#galereya" },
    { name: t("navbar.faq"), href: "#faq" },
    { name: t("navbar.contact"), href: "#kontakt" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#bosh-sahifa") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of sticky navbar
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-md border-b border-gold/20 py-2.5"
            : "bg-white/80 dark:bg-[#121212]/85 backdrop-blur-md border-b border-gold/15 py-3.5"
        }`}
        id="app-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#bosh-sahifa"
            onClick={(e) => handleLinkClick(e, "#bosh-sahifa")}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            id="navbar-logo"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-tr from-[#B8962E] via-gold to-[#FFF0B3] rounded-full flex items-center justify-center text-editorial-dark shadow-md shadow-gold/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-editorial-dark" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-editorial-dark dark:text-gray-100 whitespace-nowrap">
              Bitiruvchi <span className="text-gold">Lentalari</span>
            </span>
          </a>

          {/* Desktop Navigation - Bir qatorda, whitespace-nowrap, toza va uyg'un */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1 rounded-full bg-warm-bg/50 dark:bg-white/5 border border-gold/10"
            id="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[13px] xl:text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gold hover:bg-gold/10 px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Language & CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <ThemeToggleButton
              theme={theme}
              toggleTheme={toggleTheme}
              className="hidden sm:flex"
            />

            <button
              onClick={onOpenOrderModal}
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full bg-linear-to-r from-[#B8962E] via-gold to-[#D4AF37] hover:from-gold hover:to-[#B8962E] text-editorial-dark font-extrabold text-xs uppercase tracking-wider shadow-md shadow-gold/20 whitespace-nowrap transition-all hover:scale-105 active:scale-95 cursor-pointer"
              id="nav-cta-btn"
            >
              {t("common.buy")}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-warm-bg dark:hover:bg-white/5 text-editorial-dark dark:text-gray-100 lg:hidden transition-colors focus:outline-none border border-transparent hover:border-gold/20"
              aria-label={t("navbar.menuToggle")}
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-editorial-dark/40 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Box */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-warm-bg dark:bg-editorial-dark z-30 shadow-2xl p-6 pt-24 lg:hidden flex flex-col justify-between border-l border-gold/10"
              id="mobile-nav-drawer"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold/20 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    {t("navbar.mobileMenuTitle")}
                  </p>
                  <ThemeToggleButton
                    theme={theme}
                    toggleTheme={toggleTheme}
                    className="sm:hidden w-9 h-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-base font-bold text-editorial-dark dark:text-gray-100 hover:text-gold flex items-center justify-between border-b border-gold/5 pb-2 transition-colors"
                    >
                      {link.name}
                      <ChevronRight className="w-4 h-4 text-gold/60" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="md:hidden flex justify-center">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full py-3 bg-gold hover:bg-gold-hover text-white rounded-full font-semibold uppercase tracking-wider text-xs shadow-lg shadow-gold/20 text-center block transition-colors"
                >
                  {t("common.buy")}
                </button>
                <p className="text-xs text-center text-gray-500 font-light">
                  {t("navbar.deliveryText")}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
