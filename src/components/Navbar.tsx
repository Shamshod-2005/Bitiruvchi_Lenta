import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gold/20 py-3"
            : "bg-transparent py-5"
        }`}
        id="app-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#bosh-sahifa"
            onClick={(e) => handleLinkClick(e, "#bosh-sahifa")}
            className="flex items-center gap-2.5 group cursor-pointer"
            id="navbar-logo"
          >
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold font-serif tracking-tight text-editorial-dark group-hover:text-gold transition-colors">
              Bitiruvchi <span className="text-gold">Lentalari</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest font-medium text-gray-600 hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={onOpenOrderModal}
              className="hidden sm:inline-flex items-center justify-center bg-gold text-white px-4 py-2.5 rounded-full hover:bg-gold-hover shadow-lg shadow-gold/20 font-medium text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 focus:outline-none"
              id="nav-cta-btn"
            >
              {t("common.buy")}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-warm-bg text-editorial-dark lg:hidden transition-colors focus:outline-none border border-transparent hover:border-gold/20"
              aria-label="Menuni ochish/yopish"
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
              className="fixed inset-0 z-30 bg-[#1a1a1a]/40 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Box */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-warm-bg z-30 shadow-2xl p-6 pt-24 lg:hidden flex flex-col justify-between border-l border-gold/10"
              id="mobile-nav-drawer"
            >
              <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold border-b border-gold/20 pb-2">
                  Navigatsiya
                </p>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-base font-serif font-bold text-editorial-dark hover:text-gold flex items-center justify-between border-b border-gold/5 pb-2 transition-colors"
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
                  O'zbekiston bo'ylab tezkor yetkazib berish
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
