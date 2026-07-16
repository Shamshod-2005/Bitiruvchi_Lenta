import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz/translation.json";
import ru from "./locales/ru/translation.json";
import en from "./locales/en/translation.json";
import type { TranslationSchema } from "./types";

const storedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem("app-language")
    : null;

export const resources = {
  uz: { translation: uz as TranslationSchema },
  ru: { translation: ru as TranslationSchema },
  en: { translation: en as TranslationSchema },
} as const;

export const supportedLanguages = ["uz", "ru", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const defaultLanguage: SupportedLanguage =
  (storedLanguage as SupportedLanguage) || "uz";

void i18next.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
