"use client";

import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface p-0.5 text-[11px] font-semibold tracking-wide",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={locale === "es"}
        className={cn(
          "cursor-pointer rounded-full px-2.5 py-1 transition-colors",
          locale === "es"
            ? "bg-matcha-deep text-gold"
            : "text-ink-faint hover:text-matcha-deep"
        )}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "cursor-pointer rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-matcha-deep text-gold"
            : "text-ink-faint hover:text-matcha-deep"
        )}
      >
        EN
      </button>
    </div>
  );
}
