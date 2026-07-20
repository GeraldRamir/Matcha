export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  unit: string;
  servings: string;
  image: string;
  badge?: string;
  notes: string[];
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock";
};

export const PRODUCTS: Product[] = [
  {
    id: "ceremonial",
    name: "Ceremonial Uji",
    subtitle: "Primera cosecha · Grado ceremonial",
    description:
      "Nuestra reserva insignia. Hojas tencha de primera cosecha, cultivadas a la sombra durante 21 días y molidas en piedra de granito. Dulzor umami profundo, sin amargor.",
    price: 34,
    unit: "30 g",
    servings: "≈ 30 tazas",
    image: "/images/cutouts/product-ceremonial.png",
    badge: "Más vendido",
    notes: ["Umami dulce", "Textura sedosa", "Final limpio"],
    rating: 4.9,
    reviews: 132,
    stock: "in-stock",
  },
  {
    id: "diario",
    name: "Blend Diario",
    subtitle: "Primera y segunda cosecha",
    description:
      "El equilibrio perfecto entre calidad y uso cotidiano. Ideal para tu matcha de cada mañana, batido directo en agua o con leche vegetal.",
    price: 24,
    unit: "100 g",
    servings: "≈ 50 tazas",
    image: "/images/cutouts/product-daily.png",
    notes: ["Vegetal fresco", "Cuerpo medio", "Versátil"],
    rating: 4.8,
    reviews: 96,
    stock: "in-stock",
  },
  {
    id: "latte",
    name: "Blend para Latte",
    subtitle: "Perfil robusto · Ideal con leche",
    description:
      "Molido especialmente para brillar entre leche y hielo. Un perfil más intenso que atraviesa la cremosidad sin perder su carácter verde y fresco.",
    price: 28,
    unit: "100 g",
    servings: "≈ 40 lattes",
    image: "/images/cutouts/product-latte.png",
    badge: "Nuevo",
    notes: ["Intenso", "Notas dulces", "Perfecto con hielo"],
    rating: 4.8,
    reviews: 41,
    stock: "in-stock",
  },
  {
    id: "kit",
    name: "Kit Ceremonial",
    subtitle: "Todo para empezar tu ritual",
    description:
      "Chawan artesanal, chasen de bambú de 100 puntas, chashaku y una lata de Ceremonial Uji 30 g. Todo lo que necesitas, curado en una sola caja.",
    price: 89,
    unit: "Set completo",
    servings: "Bowl + whisk + matcha",
    image: "/images/cutouts/product-kit.png",
    badge: "Regalo ideal",
    notes: ["Chawan artesanal", "Chasen 100 puntas", "Matcha incluido"],
    rating: 5,
    reviews: 58,
    stock: "low-stock",
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
