export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  aspect: "portrait" | "landscape";
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/gallery-field.webp",
    alt: "Campos de té en Japón al amanecer",
    caption: "Origen: Japón",
    aspect: "landscape",
  },
  {
    src: "/images/gallery-whisking.webp",
    alt: "Manos batiendo matcha con un chasen de bambú",
    caption: "El ritual de cada mañana",
    aspect: "portrait",
  },
  {
    src: "/images/gallery-sifting.webp",
    alt: "Matcha siendo tamizado sobre un bowl",
    caption: "Textura fina, cero grumos",
    aspect: "portrait",
  },
  {
    src: "/images/gallery-latte-art.webp",
    alt: "Matcha latte Solae con arte en la espuma",
    caption: "Tu latte Solae",
    aspect: "landscape",
  },
  {
    src: "/images/gallery-leaves.webp",
    alt: "Hojas de té junto a matcha en polvo",
    caption: "De la hoja al polvo ceremonial",
    aspect: "portrait",
  },
  {
    src: "/images/gallery-powder.webp",
    alt: "Polvo de matcha ceremonial tamizado",
    caption: "Polvo ceremonial fino",
    aspect: "landscape",
  },
];
