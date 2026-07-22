import { PRODUCTS as PRODUCT_BASE } from "@/data/products";
import type { Product } from "@/data/products";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { getProductPrice } from "@/lib/utils";

export type LocalizedProduct = Product & { price: number };

export function getLocalizedProducts(
  dict: Dictionary,
  locale: Locale
): LocalizedProduct[] {
  return PRODUCT_BASE.map((p) => {
    const copy = dict.product[p.id as keyof typeof dict.product];
    const price = getProductPrice(p, locale);
    if (!copy) return { ...p, price };
    return {
      ...p,
      price,
      subtitle: copy.subtitle,
      description: copy.description,
      servings: copy.servings,
      badge: copy.badge,
      notes: copy.notes,
    };
  });
}

export function getLocalizedProduct(
  id: string,
  dict: Dictionary,
  locale: Locale
) {
  return getLocalizedProducts(dict, locale).find((p) => p.id === id);
}
