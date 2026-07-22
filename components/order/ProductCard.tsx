"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useLocale } from "@/hooks/use-locale";
import { fadeUp } from "@/lib/motion";
import { formatPrice, getProductPrice } from "@/lib/utils";

/** Floating garnish particles — matcha leaves / powder flecks around the cutout. */
function FloatingDetails() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Soft ground shadow under product */}
      <div className="absolute bottom-[8%] left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl" />

      {/* Leaf — top left */}
      <span className="animate-float absolute top-[12%] left-[6%] h-7 w-4 rotate-[-25deg] rounded-[40%_60%_55%_45%] bg-olive-soft/80 blur-[0.3px] shadow-sm" />
      {/* Leaf — mid right */}
      <span className="animate-float-delay absolute top-[38%] right-[2%] h-5 w-3 rotate-[40deg] rounded-[45%_55%_50%_50%] bg-matcha-400/70" />
      {/* Powder flecks */}
      <span className="absolute top-[28%] left-[14%] h-1.5 w-1.5 rounded-full bg-olive-soft/90" />
      <span className="absolute top-[48%] left-[8%] h-1 w-1 rounded-full bg-matcha-300/80" />
      <span className="absolute right-[16%] bottom-[32%] h-1.5 w-1.5 rounded-full bg-olive/70" />
      <span className="absolute top-[22%] right-[22%] h-1 w-1 rounded-full bg-cream/40" />
      {/* Tiny matcha mound accent */}
      <span className="absolute bottom-[18%] left-[10%] h-3 w-5 rounded-full bg-olive-soft/50 blur-[1px]" />
      <span className="absolute right-[12%] bottom-[22%] h-2.5 w-4 rotate-12 rounded-full bg-matcha-400/40 blur-[1px]" />
    </div>
  );
}

/**
 * Tartar-style product card: dark stage, cutout product (no bg),
 * floating price annotation, quantity + cart CTA.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCart();
  const { locale } = useLocale();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = getProductPrice(product, locale);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(20, q + 1));

  const titleMain = product.name.split(" ")[0];
  const titleRest = product.name.split(" ").slice(1).join(" ");

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-stage shadow-lift transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
    >
      {/* Header */}
      <div className="relative z-20 flex items-start justify-between px-6 pt-6">
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-cream sm:text-[1.75rem]">
            {titleMain}
          </h3>
          <p className="mt-0.5 text-sm text-cream/55">
            ({product.unit})
            {titleRest ? <span className="text-cream/35"> · {titleRest}</span> : null}
          </p>
        </div>
        <p
          className="flex items-center gap-1 rounded-full bg-cream/10 px-2.5 py-1 text-xs text-cream/75"
          aria-label={`${product.rating} de 5`}
        >
          <Star className="h-3 w-3 fill-olive-soft text-olive-soft" />
          {product.rating.toFixed(1)}
        </p>
      </div>

      {/* Cutout stage */}
      <div className="relative z-10 mx-auto mt-1 aspect-[5/6] w-[88%] max-w-[260px]">
        <FloatingDetails />

        <Image
          src={product.image}
          alt={`${product.name} — ${product.subtitle}`}
          fill
          sizes="260px"
          className="relative z-10 object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:-translate-y-1"
        />

        {/* Annotated price tag — dashed leader to product */}
        <div className="absolute top-[14%] right-0 z-20 translate-x-[18%] sm:translate-x-[28%]">
          <svg
            aria-hidden
            className="absolute top-1/2 right-[calc(100%-4px)] h-10 w-14 -translate-y-1/2 overflow-visible text-cream/55"
            viewBox="0 0 56 40"
            fill="none"
          >
            <path
              d="M52 20 C 36 20, 28 8, 8 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3.5 3.5"
              strokeLinecap="round"
            />
            <circle cx="5" cy="16" r="3.5" className="fill-cream" />
          </svg>
          <span className="inline-flex rounded-full bg-cream px-3.5 py-1.5 text-sm font-bold tracking-tight text-stage shadow-soft">
            {formatPrice(price, locale)}
          </span>
        </div>
      </div>

      {/* Tasting notes */}
      <p className="relative z-10 mx-6 mt-1 line-clamp-1 text-center text-[11px] tracking-wide text-cream/45">
        {product.notes.join(" · ")}
      </p>

      {/* Controls */}
      <div className="relative z-10 mt-auto flex items-center justify-between gap-3 p-5 pt-4">
        <div
          role="group"
          aria-label={`Cantidad de ${product.name}`}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            aria-label="Quitar una"
            onClick={dec}
            disabled={qty <= 1}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 disabled:opacity-35"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <span className="min-w-10 text-center text-sm font-medium tabular-nums text-cream">
            {qty} u
          </span>
          <button
            type="button"
            aria-label="Agregar una"
            onClick={inc}
            disabled={qty >= 20}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cream-soft text-stage transition-colors hover:bg-cream disabled:opacity-35"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>

        <button
          type="button"
          onClick={added ? openDrawer : handleAdd}
          aria-label={
            added ? "Ver pedido" : `Agregar ${product.name} al pedido`
          }
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-cream pl-4 pr-1.5 text-sm font-semibold text-stage shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          {added ? (
            <>
              Listo
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-matcha-200 text-forest">
                <Check className="h-4 w-4" strokeWidth={2} />
              </span>
            </>
          ) : (
            <>
              Al carrito
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-deep text-stage">
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </>
          )}
        </button>
      </div>

      {product.badge && (
        <span className="absolute top-5 right-5 z-20 rounded-full bg-olive-soft px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-stage uppercase">
          {product.badge}
        </span>
      )}
    </motion.article>
  );
}
