export type ComparisonRow = {
  feature: string;
  kumo: string | boolean;
  commercial: string | boolean;
  coffee: string | boolean;
};

export const COMPARISON_COLUMNS = {
  kumo: "KUMO Ceremonial",
  commercial: "Matcha comercial",
  coffee: "Café",
} as const;

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Origen único (Uji, Japón)",
    kumo: true,
    commercial: false,
    coffee: "Variable",
  },
  {
    feature: "Primera cosecha, cultivo a la sombra",
    kumo: true,
    commercial: false,
    coffee: false,
  },
  {
    feature: "Molienda en piedra de granito",
    kumo: true,
    commercial: "Molienda industrial",
    coffee: false,
  },
  {
    feature: "Energía estable (L-teanina)",
    kumo: "4–6 horas",
    commercial: "2–3 horas",
    coffee: "Pico y bajón",
  },
  {
    feature: "Sabor",
    kumo: "Umami dulce, sin amargor",
    commercial: "Amargo, terroso",
    coffee: "Ácido, tostado",
  },
  {
    feature: "Antioxidantes (EGCG)",
    kumo: "Muy alto",
    commercial: "Medio",
    coffee: "Bajo",
  },
  {
    feature: "Análisis de pureza por lote",
    kumo: true,
    commercial: false,
    coffee: false,
  },
];
