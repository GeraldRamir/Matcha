export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  aspect: "portrait" | "landscape";
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/gallery-field.webp",
    alt: "Campos de té en Uji, Japón, al amanecer entre la niebla",
    caption: "Los campos de Uji al amanecer",
    aspect: "landscape",
  },
  {
    src: "/images/gallery-whisking.webp",
    alt: "Manos batiendo matcha con un chasen de bambú en un bowl de cerámica",
    caption: "El batido tradicional con chasen",
    aspect: "portrait",
  },
  {
    src: "/images/gallery-sifting.webp",
    alt: "Matcha siendo tamizado sobre un bowl de cerámica",
    caption: "Tamizado fino, cero grumos",
    aspect: "portrait",
  },
  {
    src: "/images/gallery-latte-art.webp",
    alt: "Matcha latte con arte en la espuma sobre una mesa de roble",
    caption: "Tu latte de cada mañana",
    aspect: "landscape",
  },
  {
    src: "/images/gallery-leaves.webp",
    alt: "Hojas de tencha frescas junto a un molino de piedra con matcha",
    caption: "De la hoja tencha al polvo de jade",
    aspect: "portrait",
  },
];
