"use client";

const ITEMS = [
  "Solae Matcha",
  "Casa Solae",
  "Producido en Japón",
  "Empaque EE. UU.",
  "República Dominicana",
  "Grado ceremonial",
  "Pedido por WhatsApp",
  "Entrega 24–48 h",
];

export function BrandMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Credenciales"
      className="overflow-hidden border-y border-line bg-cream-soft py-4"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="mx-7 inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-ink-faint uppercase"
          >
            <span aria-hidden className="h-1 w-1 rounded-full bg-olive" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
