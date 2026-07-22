import { es } from "./es";
import { en } from "./en";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale } from "./types";
export { DEFAULT_LOCALE, LOCALES, LOCALE_STORAGE_KEY } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { es, en };

export type Translator = (
  path: string,
  vars?: Record<string, string | number>
) => string;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
