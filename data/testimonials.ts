export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Valeria Gómez",
    role: "Fundadora de estudio de yoga",
    quote:
      "Dejé el café hace seis meses y no miro atrás. La energía es completamente distinta: estable, sin ansiedad y sin el bajón de las 3 p. m. El Ceremonial Uji es otro nivel.",
    rating: 5,
  },
  {
    name: "Daniel Herrera",
    role: "Diseñador de producto",
    quote:
      "Soy obsesivo con los detalles y este matcha pasa el examen: color vibrante, cero grumos y un umami que no encontré en ninguna otra marca local. El empaque es precioso.",
    rating: 5,
  },
  {
    name: "Camila Rodríguez",
    role: "Médica internista",
    quote:
      "Lo recomiendo a mis pacientes que quieren reducir el café. La L-teanina hace una diferencia real en el foco. Además, el pedido por WhatsApp llegó al día siguiente.",
    rating: 5,
  },
  {
    name: "Andrés Peralta",
    role: "Chef pastelero",
    quote:
      "Uso el Blend para Latte en mi carta de bebidas y postres. El sabor se mantiene incluso horneado. Mis clientes preguntan por la marca cada semana.",
    rating: 5,
  },
  {
    name: "Sofía Martínez",
    role: "Corredora amateur",
    quote:
      "Mi pre-entreno ahora es un matcha batido en agua fría. Energía limpia por horas, sin taquicardia. El kit ceremonial convirtió mi mañana en un ritual que disfruto.",
    rating: 5,
  },
  {
    name: "Luis Fernández",
    role: "Ingeniero de software",
    quote:
      "Pedí un viernes por la noche y el sábado ya lo tenía. La atención por WhatsApp es rápida y humana. El Blend Diario tiene la mejor relación calidad-precio que probé.",
    rating: 5,
  },
];
