export const site = {
  name: "KUMO Matcha",
  shortName: "KUMO",
  tagline: "Matcha ceremonial de Uji, Japón",
  description:
    "Matcha ceremonial de primera cosecha, cultivado a la sombra en Uji y molido en piedra. Energía calma, foco sostenido. Pedidos por WhatsApp o email.",
  url: "https://kumomatcha.com",
  whatsappNumber: "18095550123",
  email: "pedidos@kumomatcha.com",
  instagram: "https://instagram.com/kumomatcha",
  address: "Santo Domingo, República Dominicana",
  hours: "Lun – Sáb · 9:00 a. m. – 6:00 p. m.",
} as const;

/** Landing nav — matches editorial reference structure */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/productos", label: "Products" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/origen", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
