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
  const storedPhase = window.localStorage.getItem(LAST_PHASE_KEY);
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  // Agar vaqt fazasi o'zgargan bo'lsa (masalan 19:00 dan keyin yoki 07:00 dan keyin birinchi marta kirganda)
  if (storedPhase !== currentPhase) {
    const autoTheme = getThemeByTime();
    window.localStorage.setItem(LAST_PHASE_KEY, currentPhase);
    window.localStorage.setItem(THEME_STORAGE_KEY, autoTheme);
    return autoTheme;
  }

  // Agar foydalanuvchi joriy faza davomida qo'lda o'zgartirgan bo'lsa, o'sha tanlovni olamiz
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  // Standart holatda vaqt bo'yicha
  window.localStorage.setItem(LAST_PHASE_KEY, currentPhase);
  return getThemeByTime();
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
      // Joriy fazani saqlab qo'yamiz, shunda yangi faza kelguncha foydalanuvchi tanlovi saqlanadi
      window.localStorage.setItem(LAST_PHASE_KEY, getTimePhase());
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
