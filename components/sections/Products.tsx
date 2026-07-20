"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

function LightProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  const { addItem, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col rounded-3xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-soft">
        <div aria-hidden className="glow-matcha absolute inset-0 opacity-60" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-xl font-bold text-ink">{product.name}</h3>
          <p className="mt-0.5 text-xs text-ink-faint">{product.unit}</p>
        </div>
        <p className="flex items-center gap-0.5 text-xs text-ink-soft">
          <Star className="h-3 w-3 fill-matcha text-matcha" />
          {product.rating.toFixed(1)}
        </p>
      </div>
      <p className="mt-3 font-serif text-2xl font-semibold text-ink">
        {formatPrice(product.price)}
      </p>
      <button
        type="button"
        onClick={added ? openDrawer : onAdd}
        className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-md bg-ink text-sm font-medium text-cream transition-colors hover:bg-matcha-deep"
      >
        {added ? "Added ✓" : "Buy Now"}
      </button>
    </motion.article>
  );
}

type ProductsProps = {
  featured?: boolean;
  showHeading?: boolean;
};

export function Products({ featured = false, showHeading = true }: ProductsProps) {
  const items = featured ? PRODUCTS.slice(0, 4) : PRODUCTS;

  return (
    <section id="products" aria-label="Products" className="bg-cream-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              The Selection
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Discover Your Ideal Matcha Haven
            </h2>
            <p className="mt-4 text-ink-soft">
              Four ways to begin your ritual — from ceremonial bowls to iced lattes.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {items.map((p) => (
            <LightProductCard key={p.id} product={p} />
          ))}
        </motion.div>

        {featured && (
          <div className="mt-12 text-center">
            <Link
              href="/productos"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              View full collection →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
