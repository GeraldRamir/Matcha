"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/types";
import { dictionaries, type Translator } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translator;
  dict: (typeof dictionaries)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const dict = dictionaries[locale];
    const t: Translator = (path, vars) => {
      const parts = path.split(".");
      let cur: unknown = dict;
      for (const part of parts) {
        if (cur == null || typeof cur !== "object") return path;
        cur = (cur as Record<string, unknown>)[part];
      }
      if (typeof cur !== "string") return path;
      if (!vars) return cur;
      return cur.replace(/\{(\w+)\}/g, (_, key: string) =>
        vars[key] != null ? String(vars[key]) : `{${key}}`
      );
    };
    return { locale, setLocale, toggleLocale, t, dict };
  }, [locale, setLocale, toggleLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
