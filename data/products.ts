export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  /** Precio en pesos dominicanos (idioma ES) */
  priceDop: number;
  /** Precio en dólares (idioma EN) */
  priceUsd: number;
  unit: string;
  servings: string;
  /** Primary / default image */
  image: string;
  /** Extra angles for the product gallery */
  images: string[];
  badge?: string;
  notes: string[];
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock";
};

const CEREMONIAL_IMAGES = [
  "/images/cutouts/solae-ceremonial/view-01.png", // frente
  "/images/cutouts/solae-ceremonial/view-02.png", // ¾ superior
  "/images/cutouts/solae-ceremonial/view-03.png", // lateral
] as const;

/** Structural product data; localized copy comes from `lib/i18n`. */
export const PRODUCTS: Product[] = [
  {
    id: "ceremonial",
    name: "Solae Premium Ceremonial",
    subtitle: "",
    description: "",
    priceDop: 2300,
    priceUsd: 39,
    unit: "4 oz",
    servings: "",
    image: CEREMONIAL_IMAGES[0],
    images: [...CEREMONIAL_IMAGES],
    badge: "Premium",
    notes: [],
    rating: 4.9,
    reviews: 132,
    stock: "in-stock",
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
