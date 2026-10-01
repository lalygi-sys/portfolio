import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, readThemePreference, THEME_STORAGE_KEY, type ColorTheme } from "@/lib/theme";

export function ThemeToggle() {
  // A stable initial render avoids differences between server markup and hydration.
  // CSS selects the matching icon from the theme already applied in the document head.
  const [theme, setTheme] = useState<ColorTheme | null>(null);
  const preference = useRef<ColorTheme | null>(null);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    preference.current = readThemePreference();

    const syncTheme = () => {
      const next = preference.current || (systemTheme.matches ? "dark" : "light");
      applyTheme(next);
      setTheme(next);
    };

    const onSystemChange = () => {
      if (preference.current === null) syncTheme();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      preference.current = readThemePreference();
      syncTheme();
    };

    syncTheme();
    systemTheme.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      systemTheme.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggleTheme = () => {
    const current = theme || document.documentElement.dataset["theme"];
    const next = current === "dark" ? "light" : "dark";
    preference.current = next;
    applyTheme(next);
    setTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The chosen theme still works for this page when storage is unavailable.
    }
  };

  const label =
    theme === null
      ? "Change color theme"
      : `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      className="theme-toggle focus-ring"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Sun className="theme-icon-light" size={19} strokeWidth={1.6} aria-hidden="true" />
      <Moon className="theme-icon-dark" size={19} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
