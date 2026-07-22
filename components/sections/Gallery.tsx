"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { GALLERY, type GalleryItem } from "@/data/gallery";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";

export function Gallery() {
  const { dict } = useLocale();
  const [active, setActive] = useState<GalleryItem | null>(null);
  const gallery = GALLERY.map((item, i) => ({
    ...item,
    alt: dict.gallery.items[i]?.alt ?? item.alt,
    caption: dict.gallery.items[i]?.caption ?? item.caption,
  }));

  return (
    <section aria-labelledby="galeria-title" className="bg-surface py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="El verde que se ve antes de"
          scriptWord="probarse"
          description="Del campo nublado al latte de tu mañana."
        />

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 [&>li]:break-inside-avoid"
        >
          {gallery.map((item) => (
            <motion.li key={item.src} variants={fadeUp}>
              <button
                onClick={() => setActive(item)}
                aria-label={`Ampliar imagen: ${item.caption}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem]"
              >
                <span
                  className={cn(
                    "relative block w-full",
                    item.aspect === "portrait" ? "aspect-3/4" : "aspect-4/3"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-5 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {item.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        label={active?.caption ?? "Imagen ampliada"}
        wide
      >
        {active && (
          <figure>
            <div
              className={cn(
                "relative w-full",
                active.aspect === "portrait" ? "aspect-3/4 max-h-[75vh]" : "aspect-4/3"
              )}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="border-t border-line px-6 py-4 text-sm text-ink-soft">
              {active.caption}
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
