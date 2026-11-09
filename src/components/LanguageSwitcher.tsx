import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "../i18n";

const languages: Array<{
  code: SupportedLanguage;
  label: string;
  flag: string;
}> = [
  { code: "uz", label: "Oʻzbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = useMemo(() => {
    return (i18n.language?.split("-")[0] as SupportedLanguage) || "uz";
  }, [i18n.language]);

  const currentLabel = languages.find((item) => item.code === currentLanguage);

  const changeLanguage = (lang: SupportedLanguage) => {
    void i18n.changeLanguage(lang);
    window.localStorage.setItem("app-language", lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 h-10 rounded-full border border-gold/25 bg-white/70 dark:bg-white/5 hover:border-gold/50 px-3.5 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-xs backdrop-blur transition-all duration-200 cursor-pointer"
      >
        <span>{currentLabel?.flag}</span>
        <span className="uppercase">{currentLanguage}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-gold/10 bg-white dark:bg-editorial-dark p-2 shadow-xl transition-colors duration-300">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => changeLanguage(language.code)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                currentLanguage === language.code
                  ? "bg-gold text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
