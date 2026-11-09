import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "theme";
const LAST_PHASE_KEY = "theme_time_phase";
const USER_MANUAL_KEY = "theme_user_manual";

/**
 * 07:00 dan 19:00 gacha kunduzgi (day), qolgan vaqtda tungi (night) faza
 */
function getTimePhase(): "day" | "night" {
  const currentHour = new Date().getHours();
  return currentHour >= 7 && currentHour < 19 ? "day" : "night";
}

function getThemeByTime(): Theme {
  return getTimePhase() === "day" ? "light" : "dark";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const currentPhase = getTimePhase();
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const storedPhase = window.localStorage.getItem(LAST_PHASE_KEY);
  const isManual = window.localStorage.getItem(USER_MANUAL_KEY) === "true";

  // Agar foydalanuvchi joriy faza davomida o'zi qo'lda bosgan bo'lsa, tanlovini saqlaymiz
  if (isManual && storedPhase === currentPhase && (storedTheme === "light" || storedTheme === "dark")) {
    return storedTheme;
  }

  // Aks holda vaqt bo'yicha to'liq avtomatik belgilanadi (kunduzi: light, kechasi: dark)
  const autoTheme = getThemeByTime();
  window.localStorage.setItem(LAST_PHASE_KEY, currentPhase);
  window.localStorage.setItem(THEME_STORAGE_KEY, autoTheme);
  window.localStorage.removeItem(USER_MANUAL_KEY);
  return autoTheme;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // HTML class va localStorage ni yangilash
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Sayt ochiq turganda har 30 soniyada vaqt oralig'ini tekshirish
  useEffect(() => {
    const checkTimeSchedule = () => {
      const currentPhase = getTimePhase();
      const storedPhase = window.localStorage.getItem(LAST_PHASE_KEY);

      // Agar vaqt chegarasi kesib o'tilsa (07:00 yoki 19:00 bo'lsa), avtomatik yangi rejimga o'tkazish
      if (storedPhase !== currentPhase) {
        const nextTheme = getThemeByTime();
        window.localStorage.setItem(LAST_PHASE_KEY, currentPhase);
        setTheme(nextTheme);
      }
    };

    const intervalId = window.setInterval(checkTimeSchedule, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  // Foydalanuvchi qo'lda tugmani bosganda rejimni o'zgartirish
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(LAST_PHASE_KEY, getTimePhase());
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      window.localStorage.setItem(USER_MANUAL_KEY, "true");
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
