"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { fadeUp, VIEWPORT, EASE } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import {
  getLocalizedProducts,
  type LocalizedProduct,
} from "@/lib/i18n/products";

const AUTO_MS = 3000;
/** Neighbors on each side of the center arc (desktop) */
const ARC_SPAN_DESKTOP = 2;
/** On mobile, only the center tin — neighbors clip and crowd 390px screens */
const ARC_SPAN_MOBILE = 0;

function useIsCompact() {
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return compact;
}

function circularOffset(index: number, active: number, length: number) {
  let d = index - active;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

/**
 * Center Arc Carousel in 3D:
 * items sit on a concave arc facing the viewer; center is largest / closest;
 * sides rotate toward the middle (coverflow). Full opacity — no fade-outs.
 * Index wraps so the track feels continuous.
 */
function CenterArcCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const compact = useIsCompact();
  const n = images.length;
  const arcSpan = compact ? ARC_SPAN_MOBILE : ARC_SPAN_DESKTOP;

  useEffect(() => {
    if (paused || n < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const prev = () => setActive((i) => (i - 1 + n) % n);
  const next = () => setActive((i) => (i + 1) % n);

  return (
    <div
      className="relative overflow-x-clip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative h-[280px] overflow-hidden sm:h-[440px] lg:h-[500px]"
        style={{ perspective: compact ? "900px" : "1400px", perspectiveOrigin: "50% 48%" }}
      >
        <div aria-hidden className="glow-matcha pointer-events-none absolute inset-[12%] opacity-40" />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[7%] left-1/2 h-8 w-[38%] -translate-x-1/2 rounded-[100%] bg-matcha-deep/20 blur-2xl sm:h-10"
          animate={{ scaleX: [1, 1.08, 1], opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {images.map((src, i) => {
            const offset = circularOffset(i, active, n);
            if (Math.abs(offset) > arcSpan) return null;

            const abs = Math.abs(offset);
            const isCenter = offset === 0;

            const spacing = compact ? 88 : 155;
            const arcDepth = compact ? 70 : 95;
            const arcLift = compact ? 12 : 18;
            const x = offset * spacing;
            const z = -abs * abs * arcDepth * 0.55;
            const yBase = abs * abs * arcLift;
            const rotateY = offset * (compact ? -36 : -48);
            const scale = isCenter
              ? compact
                ? 1.12
                : 1.55
              : Math.max(0.62, (compact ? 0.82 : 0.9) - abs * 0.14);

            return (
              <div
                key={src}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.button
                  type="button"
                  aria-label={`Vista ${i + 1} de ${n}`}
                  aria-current={isCenter ? "true" : undefined}
                  onClick={() => setActive(i)}
                  className="pointer-events-auto h-[220px] w-[165px] origin-center cursor-pointer border-0 bg-transparent p-0 sm:h-[290px] sm:w-[230px] lg:h-[320px] lg:w-[250px]"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={false}
                  animate={{
                    x,
                    y: isCenter ? [yBase - 14, yBase + 10, yBase - 14] : yBase,
                    z,
                    rotateY,
                    scale,
                    opacity: 1,
                    zIndex: isCenter ? 40 : 20 - abs,
                  }}
                  transition={
                    isCenter
                      ? {
                          x: { duration: 0.75, ease: EASE },
                          z: { duration: 0.75, ease: EASE },
                          rotateY: { duration: 0.75, ease: EASE },
                          scale: { duration: 0.75, ease: EASE },
                          opacity: { duration: 0.2 },
                          zIndex: { duration: 0 },
                          y: {
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : { duration: 0.75, ease: EASE, zIndex: { duration: 0 } }
                  }
                >
                  <div
                    className={cn(
                      "flex h-full w-full items-end justify-center",
                      isCenter &&
                        "drop-shadow-[0_40px_60px_rgba(12,64,53,0.38)]"
                    )}
                  >
                    <Image
                      src={src}
                      alt={isCenter ? `${name} — vista ${i + 1} de ${n}` : ""}
                      width={560}
                      height={700}
                      priority={isCenter || abs <= 1}
                      className="h-full w-auto max-w-full object-contain object-bottom select-none"
                      draggable={false}
                    />
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-0 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-matcha-deep hover:text-cream sm:left-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-0 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-matcha-deep hover:text-cream sm:right-1"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a vista ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-matcha-deep"
                  : "w-1.5 bg-ink/20 hover:bg-ink/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductShowcase({
  product,
  copy,
}: {
  product: LocalizedProduct;
  copy: { buyNow: string; added: string; goToOrder: string; carouselHint: string };
}) {
  const { addItem, openDrawer } = useCart();
  const { locale } = useLocale();
  const [added, setAdded] = useState(false);
  const gallery = product.images?.length ? product.images : [product.image];

  const onAdd = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
    >
      <div className="min-w-0 overflow-x-clip">
        <CenterArcCarousel images={gallery} name={product.name} />
      </div>

      <div className="min-w-0">
        {product.badge && (
          <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
            {product.badge}
          </p>
        )}
        <h3 className="mt-3 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-ink-faint">{product.subtitle}</p>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            {formatPrice(product.price, locale)}
          </p>
          <p className="text-sm text-ink-faint">
            {product.unit} · {product.servings}
          </p>
        </div>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:mt-6 sm:text-base">
          {product.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
          {product.notes.map((note) => (
            <li
              key={note}
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={added ? openDrawer : onAdd}
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-ink px-6 text-sm font-medium text-cream transition-colors hover:bg-matcha-deep sm:w-auto sm:min-w-[10rem]"
          >
            {added ? copy.added : copy.buyNow}
          </button>
          <Link
            href="/pedido"
            className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream sm:w-auto"
          >
            {copy.goToOrder}
          </Link>
        </div>

        <p className="mt-4 text-xs text-ink-faint">
          {copy.carouselHint}
        </p>
      </div>
    </motion.article>
  );
}

type ProductsProps = {
  featured?: boolean;
  showHeading?: boolean;
};

export function Products({ showHeading = true }: ProductsProps) {
  const { dict, locale } = useLocale();
  const products = getLocalizedProducts(dict, locale);
  const product = products[0];

  return (
    <section
      id="products"
      aria-label={dict.products.aria}
      className="bg-cream-soft py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {showHeading && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              {dict.products.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {dict.products.title}
            </h2>
            <p className="mt-4 text-ink-soft">
              {dict.products.subtitle}
            </p>
          </motion.div>
        )}

        {product ? (
          <ProductShowcase
            product={product}
            copy={{
              buyNow: dict.products.buyNow,
              added: dict.products.added,
              goToOrder: dict.products.goToOrder,
              carouselHint: dict.products.carouselHint,
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
