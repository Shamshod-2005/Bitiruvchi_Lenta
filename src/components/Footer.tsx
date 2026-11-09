import React from "react";
import { GraduationCap, Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
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
    if (href === "#bosh-sahifa") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
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
    <footer
      className="bg-editorial-dark dark:bg-black text-gray-400 pt-20 pb-10 border-t border-gold/20 transition-colors duration-300"
      id="app-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gold/10">
          {/* Column 1: Logo & Slogan */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-gold/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                {t("footer.brandLine")}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-400">
              {t("footer.supportText")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                {t("footer.contactEmail")}
              </span>
              <span className="text-xs text-white underline">
                shamshodabduqayumov4@gmail.com
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-b border-gold/10 pb-2">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium uppercase tracking-wider">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-gold transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-b border-gold/10 pb-2">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="tel:+998901234567"
                  className="hover:text-gold transition-colors font-bold text-white text-sm"
                >
                  +998 94 011 52 44
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="mailto:info@lentalar.uz"
                  className="hover:text-gold transition-colors font-semibold"
                >
                  info@lentalar.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">
          <p>
            © {currentYear} {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a
              href="#mahsulotlar"
              onClick={(e) => handleLinkClick(e, "#mahsulotlar")}
              className="hover:text-gold transition-colors"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#mahsulotlar"
              onClick={(e) => handleLinkClick(e, "#mahsulotlar")}
              className="hover:text-gold transition-colors"
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
